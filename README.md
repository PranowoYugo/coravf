# Cora Viral Finder

Dasbor untuk merapikan dan menganalisis data postingan viral dari file Excel/CSV.
Dibangun dengan Vite + React + TypeScript + Tailwind CSS (v3) + shadcn/ui.

## Jalankan lokal

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # hasil build di folder dist/
```

Butuh Node.js 20 atau lebih baru.

## Deploy ke Vercel lewat GitHub

1. Push project ini ke repository GitHub (folder ini adalah root repo).
2. Di Vercel: **Add New → Project → Import** repository tersebut.
3. Vercel otomatis mendeteksi Vite. Pengaturan sudah ada di `vercel.json`:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Semua rute diarahkan ke `index.html` (SPA).
4. Klik **Deploy**. Setiap `git push` berikutnya akan di-deploy otomatis.

Tidak ada environment variable yang diperlukan.
