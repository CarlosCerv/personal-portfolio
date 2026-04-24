import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background-alt pt-40 pb-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <div className="space-y-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">Legal</span>
          <h1 className="text-5xl font-semibold tracking-tighter text-foreground">Privacy Policy</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-secondary-muted">
            This site only collects the necessary information to reply to messages, follow up on consulting requests, and improve the overall portfolio experience.
          </p>
        </div>

        <section className="rounded-[32px] border border-border bg-white p-8 md:p-10">
          <div className="space-y-8 text-secondary-muted">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Information collected</h2>
              <p>
                Name, email, company, and project description when you use contact or diagnostic forms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Use of information</h2>
              <p>
                The information is used to reply to messages, prepare proposals, generate diagnostics, and maintain communication related to QA, automation, and performance services.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Third parties and storage</h2>
              <p>
                Some data may be processed through infrastructure services like Vercel, Supabase, MongoDB, or Resend, depending on the functionality you use within the site.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Contact</h2>
              <p>
                If you want to request the update or deletion of your information, you can write directly to <a className="text-primary hover:underline" href="mailto:carlos.cervart@icloud.com">carlos.cervart@icloud.com</a>.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contacto"
            className="inline-flex rounded-full bg-foreground px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all hover:bg-primary"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-full border border-border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted transition-all hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
