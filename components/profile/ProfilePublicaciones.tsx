import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PublicPost } from '@/lib/content/public-content'

export function ProfilePublicaciones({ posts }: { posts: PublicPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="space-y-10">
      <div>
        <h2 className="section-title">
          Publicaciones destacadas
        </h2>
        <p className="section-copy mt-3">
          Artículos recientes donde Carlos comparte experiencia práctica en automatización, IA y QA.
        </p>
      </div>

      <div className="space-y-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="surface-card group flex flex-col gap-4 p-6 transition-all md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div className="max-w-3xl">
              <p className="eyebrow text-[#8a8b92]">
                {new Date(post.published_at).toLocaleDateString('es-MX', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-[#111113]">
                {post.titulo}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.85] text-[#5c5d63]">{post.excerpt}</p>
            </div>
            <div className="flex items-center text-[14px] font-semibold text-[#111113] transition-colors group-hover:text-[#0071e3]">
              Leer artículo
              <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
