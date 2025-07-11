const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL Laragon
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // saya menggunakan laragon tanpa password
  database: "mahasiswa_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Terhubung ke database MySQL");
});

// Pastikan tabel mahasiswa ada
const createTableQuery = `CREATE TABLE IF NOT EXISTS mahasiswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  jurusan VARCHAR(100) NOT NULL
)`;
db.query(createTableQuery, (err) => {
  if (err) throw err;
});

// GET semua mahasiswa
app.get("/mahasiswa", (req, res) => {
  // Mengambil data mahasiswa dari database
  db.query("SELECT * FROM mahasiswa", (err, results) => {
    // Jika ada error, kirim status 500
    if (err) return res.status(500).json({ error: err.message });
    // Jika tidak ada error, kirim data mahasiswa
    res.json(results);
  });
});

// POST tambah mahasiswa
app.post("/mahasiswa", (req, res) => {
  // Mengambil nama dan jurusan dari body request
  const { nama, jurusan } = req.body;
  // Validasi input
  if (!nama || !jurusan)
    // Jika data tidak lengkap, kirim status 400
    return res.status(400).json({ error: "Data tidak lengkap" });
  // Menyimpan data mahasiswa baru ke database
  db.query(
    // Menyimpan data mahasiswa baru ke database
    "INSERT INTO mahasiswa (nama, jurusan) VALUES (?, ?)",
    [nama, jurusan],
    // Callback untuk menangani hasil query
    (err, result) => {
      // Jika ada error, kirim status 500
      if (err) return res.status(500).json({ error: err.message });
      // Jika tidak ada error, kirim data mahasiswa baru
      res.json({ id: result.insertId, nama, jurusan });
    }
  );
});

// PUT edit mahasiswa
app.put("/mahasiswa/:id", (req, res) => {
  // Mengambil id dari parameter URL
  const id = parseInt(req.params.id);
  // Mengambil nama dan jurusan dari body request
  const { nama, jurusan } = req.body;
  // Mengupdate data mahasiswa berdasarkan id
  db.query(
    // Mengupdate data mahasiswa berdasarkan id
    "UPDATE mahasiswa SET nama = ?, jurusan = ? WHERE id = ?",
    [nama, jurusan, id],
    // Callback untuk menangani hasil query
    (err, result) => {
      // Jika ada error, kirim status 500
      if (err) return res.status(500).json({ error: err.message });
      // Jika tidak ada error dan tidak ada baris yang terpengaruh, kirim status 404
      if (result.affectedRows === 0)
        // Jika tidak ada baris yang terpengaruh, kirim status 404
        return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
      // Jika tidak ada error, kirim data mahasiswa yang diupdate
      res.json({ id, nama, jurusan });
    }
  );
});

// DELETE hapus mahasiswa
app.delete("/mahasiswa/:id", (req, res) => {
  // Mengambil id dari parameter URL
  const id = parseInt(req.params.id);
  // Menghapus mahasiswa berdasarkan id
  db.query("DELETE FROM mahasiswa WHERE id = ?", [id], (err, result) => {
    // Jika ada error, kirim status 500
    if (err) return res.status(500).json({ error: err.message });
    // Jika tidak ada baris yang terpengaruh, kirim status 404
    if (result.affectedRows === 0)
      // Jika tidak ada baris yang terpengaruh, kirim status 404
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    // Jika tidak ada error, kirim id mahasiswa yang dihapus
    res.json({ id });
  });
});
// Menjalankan server pada port yang ditentukan
app.listen(PORT, () => {
  // Menampilkan pesan bahwa API berjalan
  console.log(`API berjalan di http://localhost:${PORT}/mahasiswa`);
});
