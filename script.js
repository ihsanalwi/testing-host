const produkList = [
  {
    nama: "Kaos Pria Polos",
    harga: 100000,
    kategori: "pria",
    img: "https://images.unsplash.com/photo-1602810313183-009d50a2b9cc?auto=format&fit=crop&w=400&q=80"
  },
  {
    nama: "Kemeja Pria",
    harga: 140000,
    kategori: "pria",
    img: "https://images.unsplash.com/photo-1583744946564-b52ac3d8e3b8?auto=format&fit=crop&w=400&q=80"
  },
  {
    nama: "Blouse Wanita",
    harga: 130000,
    kategori: "wanita",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
  },
  {
    nama: "Dress Kasual",
    harga: 160000,
    kategori: "wanita",
    img: "https://images.unsplash.com/photo-1612336307429-ded7caa1e29b?auto=format&fit=crop&w=400&q=80"
  },
  {
    nama: "Jaket Hoodie",
    harga: 150000,
    kategori: "jaket",
    img: "https://images.unsplash.com/photo-1520975918318-3a3c6ab35c1b?auto=format&fit=crop&w=400&q=80"
  },
  {
    nama: "Jaket Denim",
    harga: 175000,
    kategori: "jaket",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
  }
];

let keranjang = [];
let total = 0;

function tampilkanProduk(kategori = "all") {
  const container = document.getElementById("produkContainer");
  container.innerHTML = "";

  const produkTampil = kategori === "all"
    ? produkList
    : produkList.filter(p => p.kategori === kategori);

  produkTampil.forEach(p => {
    const div = document.createElement("div");
    div.className = "produk";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>Rp ${p.harga.toLocaleString()}</p>
      <button onclick="tambahKeKeranjang('${p.nama}', ${p.harga})">Tambah ke Keranjang</button>
    `;
    container.appendChild(div);
  });
}

function filterProduk() {
  const kategori = document.getElementById("filterKategori").value;
  tampilkanProduk(kategori);
}

function tambahKeKeranjang(nama, harga) {
  keranjang.push({ nama, harga });
  total += harga;
  updateKeranjang();
}

function updateKeranjang() {
  const daftarKeranjang = document.getElementById("daftarKeranjang");
  const totalHarga = document.getElementById("totalHarga");

  daftarKeranjang.innerHTML = "";
  keranjang.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} - Rp ${item.harga.toLocaleString()}`;
    daftarKeranjang.appendChild(li);
  });

  totalHarga.textContent = `Total: Rp ${total.toLocaleString()}`;
}

function tampilkanFormPembayaran() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }
  document.getElementById("formPembayaran").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
}

function prosesPembayaran(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const metode = document.getElementById("metode").value;

  if (!nama || !alamat || !metode) {
    alert("Harap isi semua data pembayaran!");
    return;
  }

  alert(
    `✅ Terima kasih, ${nama}!\n\nPesananmu akan dikirim ke:\n${alamat}\n\nMetode Pembayaran: ${metode}\nTotal: Rp ${total.toLocaleString()}\n\nPesanan sedang diproses!`
  );

  keranjang = [];
  total = 0;
  updateKeranjang();
  batalBayar();
}

function batalBayar() {
  document.getElementById("formPembayaran").style.display = "none";
  document.getElementById("formBayar").reset();
}

// Jalankan pertama kali
tampilkanProduk();
