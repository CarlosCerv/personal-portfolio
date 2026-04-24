import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { createAdminNotification } from '@/lib/admin/notifications'

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    if (!data.nombre || !data.email || !data.descripcion) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    if (supabase) {
      await supabase.from('contact_messages').insert({
        nombre: data.nombre,
        email: data.email,
        empresa: data.empresa || null,
        servicio: data.servicio || null,
        descripcion: data.descripcion,
      })
    }

    await createAdminNotification({
      title: `New message from ${data.nombre}`,
      message: `${data.servicio || 'General inquiry'}${data.empresa ? ` · ${data.empresa}` : ''}`,
      severity: 'info',
      href: '/admin',
    })

    const resend = getResendClient()

    if (resend) {
      // 1. Email to Carlos (Admin Notification)
      await resend.emails.send({
        from: 'Contact Form <hello@carloscervantes.com>',
        to: 'carlos.cervart@icloud.com',
        subject: `[Contact] New message from ${data.nombre}`,
        html: `
          <h3>New contact message</h3>
          <p><strong>From:</strong> ${data.nombre} (${data.email})</p>
          <p><strong>Company:</strong> ${data.empresa || 'N/A'}</p>
          <p><strong>Service:</strong> ${data.servicio}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #1d1d1f; padding-left: 20px; font-style: italic;">
            ${data.descripcion}
          </blockquote>
        `
      })

      // 2. Confirmation to User
      await resend.emails.send({
        from: 'Carlos Cervantes <hello@carloscervantes.com>',
        to: data.email,
        subject: `Thank you for contacting me, ${data.nombre}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1d1d1f;">
            <h1 style="font-size: 24px; color: #1d1d1f;">Hi ${data.nombre},</h1>
            <p style="font-size: 16px; line-height: 1.5;">I have received your message about <strong>${data.servicio}</strong>. I will get back to you in less than 24 hours.</p>
            <p style="font-size: 16px; line-height: 1.5;">In the meantime, you can explore my blog or check my professional profile.</p>
            
            <hr style="border: none; border-top: 1px solid #d2d2d7; margin: 40px 0;" />
            <p style="font-size: 12px; color: #6f6f77;">&copy; ${new Date().getFullYear()} Carlos Cervantes &middot; QA Consultant</p>
          </div>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'Error sending message' }, { status: 500 })
  }
}
