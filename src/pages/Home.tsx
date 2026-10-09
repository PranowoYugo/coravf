import { Flame } from 'lucide-react'
import { useState } from 'react'
import type { ViralPost } from '@/types/post'
import { parseSpreadsheet } from '@/lib/viral'
import UploadSection from '@/sections/UploadSection'
import DashboardSection from '@/sections/DashboardSection'

export default function Home() {
  const [posts, setPosts] = useState<ViralPost[] | null>(null)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setLoading(true)
    setError('')
    try {
      const data = await parseSpreadsheet(file)
      setPosts(data)
      setFileName(file.name)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal membaca file. Pastikan formatnya benar.')
      setPosts(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf7f1]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#18181b]/10 bg-[#faf7f1]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c0613d] text-[#faf7f1]">
              <Flame className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="leading-tight">
              <h1 className="font-display text-lg font-bold text-[#18181b] sm:text-xl">
                Cora Viral Finder
              </h1>
              <p className="hidden text-[11px] font-medium text-[#18181b]/45 sm:block">
                Temukan postingan paling viral dari data Anda
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {posts ? (
          <DashboardSection posts={posts} fileName={fileName} onReset={() => setPosts(null)} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold leading-tight text-[#18181b] sm:text-4xl">
                Rapikan data postingan,{' '}
                <em className="not-italic text-[#c0613d]">temukan yang viral</em>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#18181b]/55 sm:text-base">
                Unggah file Excel berisi data postingan Facebook — link, suka, komentar, share, caption,
                dan gambar — lalu lihat semuanya tersusun rapi dalam grid yang bisa dicari, difilter,
                dan diurutkan.
              </p>
            </div>
            <UploadSection onFile={handleFile} loading={loading} />
            {error && (
              <div className="rounded-2xl border border-[#c0613d]/30 bg-[#c0613d]/5 p-4 text-sm text-[#18181b]/75">
                {error}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#18181b]/10 py-6">
        <p className="px-4 text-center text-sm text-[#18181b]/55">
          Dibuat oleh Pranowo Yugo (
          <a
            href="https://instagram.com/pranowoyugo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#c0613d] underline-offset-2 hover:underline"
          >
            instagram.com/pranowoyugo
          </a>
          )
        </p>
      </footer>
    </div>
  )
}
