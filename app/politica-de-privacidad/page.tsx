import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background-alt pt-40 pb-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <div className="space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Legal</span>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">Política de privacidad</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-secondary-muted">
            Este sitio recopila únicamente la información necesaria para responder mensajes, dar seguimiento a
            solicitudes de consultoría y mejorar la experiencia general del portafolio.
          </p>
        </div>

        <section className="rounded-[32px] border border-border bg-white p-8 md:p-10">
          <div className="space-y-8 text-secondary-muted">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Información que se recopila</h2>
              <p>
                Nombre, correo electrónico, empresa y descripción del proyecto cuando usas formularios de
                contacto o diagnóstico.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Uso de la información</h2>
              <p>
                La información se utiliza para responder mensajes, preparar propuestas, generar diagnósticos y
                mantener comunicación relacionada con servicios de QA, automatización y performance.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Terceros y almacenamiento</h2>
              <p>
                Algunos datos pueden procesarse mediante servicios de infraestructura como Vercel, Supabase,
                MongoDB o Resend, según la funcionalidad que uses dentro del sitio.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Contacto</h2>
              <p>
                Si quieres solicitar actualización o eliminación de tu información, puedes escribir directamente
                a <a className="text-primary hover:underline" href="mailto:carlos.cervart@icloud.com">carlos.cervart@icloud.com</a>.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contacto"
            className="inline-flex rounded-full bg-foreground px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-primary"
          >
            Contactar
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-full border border-border px-6 py-3 text-xs font-black uppercase tracking-widest text-muted transition-all hover:text-foreground"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
