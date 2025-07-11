// Dummy URL API, ganti dengan URL backend
const API_URL = "http://localhost:3000/mahasiswa";

const tableBody = document.querySelector("#mahasiswa-table tbody");
const statusDiv = document.getElementById("status");
const formTambah = document.getElementById("form-tambah");
const inputNama = document.getElementById("nama");
const inputJurusan = document.getElementById("jurusan");

// Tampilkan data mahasiswa
function loadMahasiswa() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      tableBody.innerHTML = "";
      data.forEach((mhs) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${mhs.id}</td>
                    <td><span class="nama">${mhs.nama}</span></td>
                    <td><span class="jurusan">${mhs.jurusan}</span></td>
                    <td>
                        <button onclick="editMahasiswa(${mhs.id}, this)">Edit</button>
                        <button onclick="hapusMahasiswa(${mhs.id})">Hapus</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch(() => showStatus("Gagal mengambil data", true));
}

// Tambah mahasiswa baru
formTambah.onsubmit = function (e) {
  e.preventDefault();
  const nama = inputNama.value.trim();
  const jurusan = inputJurusan.value.trim();
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, jurusan }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then(() => {
      showStatus("Mahasiswa berhasil ditambah");
      formTambah.reset();
      loadMahasiswa();
    })
    .catch(() => showStatus("Gagal menambah mahasiswa", true));
};

// Edit mahasiswa
window.editMahasiswa = function (id, btn) {
  const row = btn.closest("tr");
  const namaSpan = row.querySelector(".nama");
  const jurusanSpan = row.querySelector(".jurusan");
  if (btn.textContent === "Edit") {
    namaSpan.innerHTML = `<input value="${namaSpan.textContent}" class="edit-nama">`;
    jurusanSpan.innerHTML = `<input value="${jurusanSpan.textContent}" class="edit-jurusan">`;
    btn.textContent = "Simpan";
  } else {
    const namaBaru = row.querySelector(".edit-nama").value;
    const jurusanBaru = row.querySelector(".edit-jurusan").value;
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: namaBaru, jurusan: jurusanBaru }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(() => {
        showStatus("Data mahasiswa berhasil diubah");
        loadMahasiswa();
      })
      .catch(() => showStatus("Gagal mengubah data", true));
  }
};

// Hapus mahasiswa
window.hapusMahasiswa = function (id) {
  if (!confirm("Yakin ingin menghapus?")) return;
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then(() => {
      showStatus("Mahasiswa berhasil dihapus");
      loadMahasiswa();
    })
    .catch(() => showStatus("Gagal menghapus mahasiswa", true));
};

// Tampilkan status
function showStatus(msg, error = false) {
  statusDiv.textContent = msg;
  statusDiv.style.color = error ? "#e74c3c" : "#27ae60";
  setTimeout(() => (statusDiv.textContent = ""), 2000);
}

// Load data saat halaman dibuka
loadMahasiswa();
