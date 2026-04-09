import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PublicPost } from '@/lib/content/public-content'

export function ProfilePublicaciones({ posts }: { posts: PublicPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
          Publicaciones destacadas
        </h2>
        <p className="mt-2 text-base text-secondary-muted">
          Artículos recientes donde Carlos comparte experiencia práctica en automatización, IA y QA.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="admin-card flex flex-col gap-4 rounded-[28px] p-6 transition-transform duration-200 hover:-translate-y-1 md:flex-row md:items-center md:justify-between"
          >
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                {new Date(post.published_at).toLocaleDateString('es-MX', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                {post.titulo}
              </h3>
              <p className="mt-3 text-sm leading-[1.8] text-secondary-muted">{post.excerpt}</p>
            </div>
            <div className="flex items-center text-sm font-semibold text-primary">
              Leer artículo
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
