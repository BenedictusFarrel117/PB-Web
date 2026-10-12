let pilihanTersimpan = null;
let daftarPilihanTersimpan = [];

function buatPilihan() {
    let nama = document.getElementById("nama").value.trim();
    let jumlah = document.getElementById("jumlahPilihan").value;

    if (nama === "") {
        alert("Nama harus diisi!");
        return;
    }
    if (nama.length < 2) {
        alert("Nama minimal 2 karakter!");
        return;
    }
    if (/\d/.test(nama)) {
        alert("Nama tidak boleh mengandung angka!");
        return;
    }
    if (jumlah === "") {
        alert("Jumlah pilihan harus diisi!");
        return;
    }

    jumlah = parseInt(jumlah);
    if (isNaN(jumlah) || jumlah <= 0) {
        alert("Jumlah pilihan harus angka positif!");
        return;
    }
    if (jumlah > 10) {
        alert("Jumlah pilihan maksimal 10!");
        return;
    }

    document.getElementById("pilihan").innerHTML = "";
    document.getElementById("emailSection").innerHTML = "";
    document.getElementById("hasil").innerHTML = "";
    pilihanTersimpan = null;
    daftarPilihanTersimpan = [];

    let pilihan = document.getElementById("pilihan");
    for (let i = 0; i < jumlah; i++) {
        pilihan.innerHTML +=
            "<p>Pilihan " +
            (i + 1) +
            " : " +
            "<input type='text' id='pilihan" +
            (i + 1) +
            "'></p>";
    }
    pilihan.innerHTML += "<button onclick='simpanPilihan()'>OK</button>";
}

function simpanPilihan() {
    let jumlah = parseInt(document.getElementById("jumlahPilihan").value);
    let daftarPilihan = [];

    for (let i = 0; i < jumlah; i++) {
        let input = document.getElementById("pilihan" + (i + 1));
        if (input === null) {
            alert("Data pilihan tidak ditemukan. Silakan ulangi dari awal.");
            return;
        }
        let teks = input.value.trim();
        if (teks === "") {
            alert("Pilihan " + (i + 1) + " tidak boleh kosong!");
            return;
        }
        if (teks.length < 1) {
            alert("Pilihan " + (i + 1) + " minimal 1 karakter!");
            return;
        }
        daftarPilihan.push(teks);
    }

    let pilihanUnik = [...new Set(daftarPilihan)];
    if (pilihanUnik.length !== daftarPilihan.length) {
        alert(
            "Terdapat pilihan yang sama! Silakan isi dengan pilihan yang berbeda.",
        );
        return;
    }

    daftarPilihanTersimpan = [...daftarPilihan];

    let hasilPilihan = document.getElementById("pilihan");
    hasilPilihan.innerHTML = "<p><b>Pilihan :</b></p>";

    for (let i = 0; i < daftarPilihan.length; i++) {
        hasilPilihan.innerHTML +=
            "<input type='radio' name='pilihan' value='" +
            daftarPilihan[i] +
            "' id='radio" +
            i +
            "'>" +
            "<label for='radio" +
            i +
            "'> " +
            daftarPilihan[i] +
            "</label><br>";
    }

    hasilPilihan.innerHTML +=
        "<p><i>[Atau dalam bentuk Drop Down]</i></p>" +
        "<select id='dropdownPilihan'>";
    for (let i = 0; i < daftarPilihan.length; i++) {
        hasilPilihan.innerHTML +=
            "<option value='" +
            daftarPilihan[i] +
            "'>" +
            daftarPilihan[i] +
            "</option>";
    }
    hasilPilihan.innerHTML +=
        "</select><br><br>" +
        "<button onclick='simpanPilihanAkhir()'>OK</button>";
}

function simpanPilihanAkhir() {
    let radio = document.querySelector("input[name='pilihan']:checked");
    let dropdown = document.getElementById("dropdownPilihan");

    if (radio !== null) {
        pilihanTersimpan = radio.value;
    } else if (dropdown !== null && dropdown.value !== "") {
        pilihanTersimpan = dropdown.value;
    } else {
        alert("Silakan pilih salah satu pilihan!");
        return;
    }

    let emailSection = document.getElementById("emailSection");
    emailSection.innerHTML =
        "<p>Email:</p>" +
        "<input type='email' id='email' " +
        "pattern='[^@\\s]+@[^@\\s]+\\.[^@\\s]{2,}' required>" +
        "<br><br>" +
        "<button onclick='selesai()'>OK</button>";
}

function selesai() {
    let email = document.getElementById("email");

    if (email === null) {
        alert("Input email tidak ditemukan. Silakan ulangi dari awal.");
        return;
    }
    if (email.value.trim() === "") {
        alert("Email harus diisi!");
        return;
    }
    if (!email.checkValidity()) {
        alert("Format email tidak valid! (contoh: nama@gmail.com)");
        return;
    }
    if (pilihanTersimpan === null) {
        alert("Silakan pilih salah satu pilihan terlebih dahulu!");
        return;
    }

    let nama = document.getElementById("nama").value.trim();
    let jumlah = parseInt(document.getElementById("jumlahPilihan").value);
    let daftarPilihan = daftarPilihanTersimpan;

    let hasil = document.getElementById("hasil");
    hasil.innerHTML =
        "<div class='hasil-box'>" +
        "<h3>Hasil</h3>" +
        "<p>Hallo, nama saya " +
        nama +
        ", email " +
        email.value +
        " saya mempunyai sejumlah " +
        jumlah +
        " pilihan yaitu " +
        daftarPilihan.join(", ") +
        ", dan saya memilih " +
        pilihanTersimpan +
        ".</p>" +
        "</div>";
}
