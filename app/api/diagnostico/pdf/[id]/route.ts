import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateDiagnosticPDF } from '@/lib/pdf/generator'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { id } = params

    // Fetch the lead result from Supabase
    const { data: lead, error } = await supabase
      .from('diagnostico_leads')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !lead) {
      return new Response('Diagnóstico no encontrado o expirado', { status: 404 })
    }

    const userData = {
      nombre: lead.nombre,
      empresa: lead.empresa
    }

    const pdfBuffer = await generateDiagnosticPDF(lead.resultado, userData)

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Diagnostico_QA_${lead.nombre.replace(/\s+/g, '_')}.pdf"`
      }
    })

  } catch (error) {
    console.error('PDF Route Error:', error)
    return new Response('Error generando el PDF', { status: 500 })
  }
}
