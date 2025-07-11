# Aplikasi Daftar Mahasiswa

Aplikasi web sederhana untuk mengelola data mahasiswa menggunakan Node.js (Express) dan MySQL (Laragon) sebagai backend, serta HTML/CSS/JS sebagai frontend.

## Fitur

- Tampilkan daftar mahasiswa
- Tambah mahasiswa baru
- Edit data mahasiswa
- Hapus mahasiswa
- Notifikasi status aksi (berhasil/gagal)

## Struktur Folder

- `frontend/` : berisi file HTML, CSS, dan JS untuk tampilan web
- `backend/` : berisi server Node.js dan koneksi database

## Cara Menjalankan

### Backend

1. Pastikan MySQL Laragon sudah berjalan dan database `mahasiswa_db` sudah dibuat:
   ```sql
   CREATE DATABASE mahasiswa_db;
   ```
2. Install dependency di folder backend:
   ```powershell
   cd tugas24/backend
   npm install
   ```
3. Jalankan server backend:
   ```powershell
   node server.js
   ```

### Frontend

Buka file `frontend/index.html` di browser.

## Konfigurasi Database

- Default user: `root`
- Default password: kosong ("")
- Nama database: `mahasiswa_db`

## Catatan

- File database dan folder `node_modules` sudah diabaikan oleh `.gitignore`.
- Untuk pengembangan, gunakan Laragon agar backend dan database berjalan lancar di Windows.

---

