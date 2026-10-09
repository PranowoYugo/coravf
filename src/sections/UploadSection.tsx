import { FileSpreadsheet, UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'

interface Props {
  onFile: (file: File) => void
  loading: boolean
}

export default function UploadSection({ onFile, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0]
    if (f) onFile(f)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={`flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
        dragOver
          ? 'border-[#c0613d] bg-[#c0613d]/5'
          : 'border-[#18181b]/20 bg-white/60 hover:border-[#c0613d]/60'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#18181b] text-[#faf7f1]">
        {loading ? (
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#faf7f1]/30 border-t-[#faf7f1]" />
        ) : (
          <UploadCloud className="h-7 w-7" strokeWidth={1.8} />
        )}
      </div>
      <div>
        <p className="font-display text-xl font-semibold text-[#18181b]">
          {loading ? 'Memproses file…' : 'Unggah file Excel atau CSV'}
        </p>
        <p className="mt-1 text-sm text-[#18181b]/55">
          Seret & letakkan file di sini, atau ketuk untuk memilih
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-[#e8ddcb] px-4 py-2 text-xs font-medium text-[#18181b]/70">
        <FileSpreadsheet className="h-4 w-4" />
        Mendukung .xlsx, .xls, .csv — kolom: Post URL, Likes, Comments, Shares, Type, Created, Content, Image URL
      </div>
    </div>
  )
}
