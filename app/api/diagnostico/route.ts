import { NextResponse } from 'next/server'
import { generateDiagnostic } from '@/lib/ai/diagnostico'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import crypto from 'crypto'
import { createAdminNotification } from '@/lib/admin/notifications'

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // 1. Basic validation
    if (!data.email || !data.nombre || !data.tipo) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 })
    }

    // 2. Generate AI Diagnostic
    const diagnostic = await generateDiagnostic(data)
    
    // 3. Save to Supabase (Leads table)
    const supabase = await createClient()
    const dbLead = supabase
      ? (await supabase.from('diagnostico_leads').insert({
          nombre: data.nombre,
          email: data.email,
          empresa: data.empresa,
          rol: data.rol,
          tipo: data.tipo,
          sintomas: data.sintomas,
          score: diagnostic.score,
          score_label: diagnostic.scoreLabel,
          paquete_recomendado: diagnostic.paqueteRecomendado,
          resultado: diagnostic
        }).select().single()).data
      : null

    const pdfId = dbLead?.id || crypto.randomBytes(16).toString('hex')
    const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://carloscervantes-qa.vercel.app'}/api/diagnostico/pdf/${pdfId}`

    await createAdminNotification({
      title: `New lead: ${data.nombre}`,
      message: `${data.empresa || 'Project without company'} · ${diagnostic.paqueteRecomendado} · score ${diagnostic.score}%`,
      severity: diagnostic.score >= 80 ? 'success' : 'info',
      href: '/admin',
    })

    // 4. Send Emails (Non-blocking)
    const resend = getResendClient()

    if (resend) {
      // To Client
      resend.emails.send({
        from: 'Carlos Cervantes <hello@carloscervantes.com>',
        to: data.email,
        subject: `Your QA diagnostic is ready, ${data.nombre}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1d1d1f;">
            <h1 style="font-size: 24px; color: #1d1d1f;">Hi ${data.nombre},</h1>
            <p style="font-size: 16px; line-height: 1.5;">I have generated your personalized QA diagnostic based on data from <strong>${data.empresa || 'your project'}</strong>.</p>
            
            <div style="background: #f5f5f7; padding: 30px; border-radius: 20px; text-align: center; margin: 30px 0;">
              <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; margin-bottom: 5px;">Your QA Maturity Score</p>
              <div style="font-size: 48px; font-weight: 900; color: #1d1d1f;">${diagnostic.score}%</div>
              <p style="font-weight: bold; margin-top: 5px;">STATUS: ${diagnostic.scoreLabel.toUpperCase()}</p>
            </div>

            <p style="font-size: 16px;">You can download the full PDF report here:</p>
            <a href="${pdfUrl}" style="display: inline-block; padding: 15px 30px; background: #1d1d1f; color: white; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 10px 0;">Download PDF Diagnostic</a>

            <hr style="border: none; border-top: 1px solid #d2d2d7; margin: 40px 0;" />
            <p style="font-size: 12px; color: #6f6f77;">&copy; ${new Date().getFullYear()} Carlos Cervantes &middot; QA Consultant</p>
          </div>
        `
      }).catch(e => console.error("Email error:", e))

      // To Carlos (Lead notification)
      resend.emails.send({
        from: 'QA Lead <hello@carloscervantes.com>',
        to: 'carlos.cervart@icloud.com',
        subject: `[Lead] QA Diagnostic: ${data.nombre} - Score ${diagnostic.score}`,
        html: `
          <h3>New Lead Generated</h3>
          <p><strong>Lead:</strong> ${data.nombre} (${data.email})</p>
          <p><strong>Company:</strong> ${data.empresa || 'N/A'}</p>
          <p><strong>Score:</strong> ${diagnostic.score}% - ${diagnostic.scoreLabel}</p>
          <p><strong>Package:</strong> ${diagnostic.paqueteRecomendado}</p>
          <p><a href="${pdfUrl}">View PDF</a></p>
        `
      }).catch(e => console.error("Admin Email error:", e))
    }

    return NextResponse.json({ ...diagnostic, pdfId })
  } catch (error) {
    console.error('API /diagnostico Error:', error)
    return NextResponse.json({ error: 'Error generating diagnostic' }, { status: 500 })
  }
}
