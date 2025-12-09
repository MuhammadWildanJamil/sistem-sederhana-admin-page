# Proyek Xionco

Aplikasi web sederhana yang dibangun dengan Node.js, Express, dan Knex.js untuk manajemen data menggunakan database MySQL.

## Fitur
- Framework Express.js untuk routing dan server.
- Knex.js sebagai query builder untuk berinteraksi dengan database.
- EJS sebagai template engine untuk render halaman.

## Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut:
- [Node.js](https://nodejs.org/) (v18 atau lebih baru direkomendasikan)
- [MySQL](https://www.mysql.com/downloads/) atau database sejenis (misalnya MariaDB).

## Panduan Instalasi & Penggunaan

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/NAMA_USER_ANDA/NAMA_REPO_ANDA.git
    cd NAMA_REPO_ANDA
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Setup Database (menggunakan XAMPP):**
    - Nyalakan **Apache** dan **MySQL** dari XAMPP Control Panel.
    - Buka browser dan pergi ke `http://localhost/phpmyadmin`.
    - Klik **New** di sidebar kiri, masukkan nama database `xionco_db`, dan klik **Create**.
    - Setelah database dibuat, pilih database `xionco_db` tersebut.
    - Klik tab **Import** di bagian atas.
    - Klik **"Choose File"** dan pilih file `database/xionco_db.sql` dari dalam direktori proyek ini.
    - Gulir ke bawah dan klik **Import**. Tabel dan data contoh akan ditambahkan ke database Anda.

4.  **Konfigurasi Environment:**
    - Pastikan Anda memiliki user dan password untuk mengakses database. Secara default, user XAMPP adalah `root` dengan password kosong.
    - Salin file `.env.example` menjadi `.env`.
      ```bash
      cp .env.example .env
      ```
    - Buka file `.env` dan sesuaikan nilai `DB_USER` dan `DB_PASSWORD` dengan konfigurasi database Anda.

5.  **Jalankan Server:**
    Gunakan perintah berikut untuk menjalankan server pengembangan:
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:3000`. Buka alamat tersebut di browser Anda.