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
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
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
      title: `Nuevo mensaje de ${data.nombre}`,
      message: `${data.servicio || 'Consulta general'}${data.empresa ? ` · ${data.empresa}` : ''}`,
      severity: 'info',
      href: '/admin',
    })

    const resend = getResendClient()

    if (resend) {
      // 1. Email to Carlos (Admin Notification)
      await resend.emails.send({
        from: 'Contact Form <hello@carloscervantes.com>',
        to: 'carlos.cervart@icloud.com',
        subject: `[Contacto] Nuevo mensaje de ${data.nombre}`,
        html: `
          <h3>Nuevo mensaje de contacto</h3>
          <p><strong>De:</strong> ${data.nombre} (${data.email})</p>
          <p><strong>Empresa:</strong> ${data.empresa || 'N/A'}</p>
          <p><strong>Servicio:</strong> ${data.servicio}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="border-left: 4px solid #0071e3; padding-left: 20px; font-style: italic;">
            ${data.descripcion}
          </blockquote>
        `
      })

      // 2. Confirmation to User
      await resend.emails.send({
        from: 'Carlos Cervantes <hello@carloscervantes.com>',
        to: data.email,
        subject: `Gracias por contactarme, ${data.nombre}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1d1d1f;">
            <h1 style="font-size: 24px; color: #0071e3;">Hola ${data.nombre},</h1>
            <p style="font-size: 16px; line-height: 1.5;">He recibido tu mensaje sobre <strong>${data.servicio}</strong>. Me pondré en contacto contigo en menos de 24 horas.</p>
            <p style="font-size: 16px; line-height: 1.5;">Mientras tanto, puedes explorar mi blog o revisar mi perfil profesional.</p>
            
            <hr style="border: none; border-top: 1px solid #d2d2d7; margin: 40px 0;" />
            <p style="font-size: 12px; color: #86868b;">&copy; ${new Date().getFullYear()} Carlos Cervantes &middot; QA Consultant</p>
          </div>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
