import { ExternalLink, Heart, MessageCircle, Share2, ImageOff, Trophy } from 'lucide-react'
import { useState } from 'react'
import type { ViralPost } from '@/types/post'
import { formatDate, formatNum } from '@/lib/viral'

const TYPE_STYLES: Record<string, string> = {
  video: 'bg-[#18181b] text-[#faf7f1]',
  album: 'bg-[#c0613d] text-[#faf7f1]',
  photo: 'bg-[#e8ddcb] text-[#18181b]',
}

export default function PostCard({ post, rank }: { post: ViralPost; rank?: number }) {
  const [imgError, setImgError] = useState(false)
  const isTop = rank !== undefined && rank <= 3

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#18181b]/10 bg-white transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(24,24,27,0.25)]">
      {/* Thumbnail */}
      <a
        href={post.postUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[4/3] overflow-hidden bg-[#e8ddcb]"
        aria-label="Buka postingan di Facebook"
      >
        {post.imageUrl && !imgError ? (
          <img
            src={post.imageUrl}
            alt={post.content ? post.content.slice(0, 80) : 'Thumbnail postingan'}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#18181b]/35">
            <ImageOff className="h-8 w-8" strokeWidth={1.5} />
            <span className="text-xs">Gambar tidak tersedia</span>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
            TYPE_STYLES[post.type.toLowerCase()] ?? 'bg-[#e8ddcb] text-[#18181b]'
          }`}
        >
          {post.type}
        </span>
        {isTop && (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-[#ffd236] px-3 py-1 text-[11px] font-bold text-[#18181b]">
            <Trophy className="h-3.5 w-3.5" strokeWidth={2.5} />
            #{rank}
          </span>
        )}
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <p className="line-clamp-3 min-h-[3.75rem] whitespace-pre-line text-sm leading-relaxed text-[#18181b]/85">
          {post.content || <span className="italic text-[#18181b]/40">Tanpa caption</span>}
        </p>

        <div className="text-xs font-medium text-[#18181b]/45">{formatDate(post)}</div>

        {/* Stats */}
        <div className="mt-auto grid grid-cols-3 divide-x divide-[#18181b]/10 rounded-xl border border-[#18181b]/10 bg-[#faf7f1]">
          <Stat icon={<Heart className="h-4 w-4" />} label="Suka" value={post.likes} />
          <Stat icon={<MessageCircle className="h-4 w-4" />} label="Komentar" value={post.comments} />
          <Stat icon={<Share2 className="h-4 w-4" />} label="Share" value={post.shares} />
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs font-semibold text-[#c0613d]">
            Skor viral {formatNum(post.score)}
          </span>
          {post.postUrl && (
            <a
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#18181b]/15 px-4 text-xs font-semibold text-[#18181b] transition-colors hover:bg-[#18181b] hover:text-[#faf7f1]"
            >
              Lihat Post
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1 py-2.5">
      <span className="flex items-center gap-1 text-[#c0613d]">{icon}</span>
      <span className="text-sm font-bold tabular-nums text-[#18181b]">{formatNum(value)}</span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-[#18181b]/40">{label}</span>
    </div>
  )
}
