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

3.  **Setup Database:**
    - Buat sebuah database di MySQL dengan nama `xionco_db`.
    - Buat user database (misalnya `xionco_admin`) dan berikan hak akses ke database `xionco_db`.

4.  **Konfigurasi Environment:**
    - Salin file `.env.example` menjadi `.env`.
      ```bash
      cp .env.example .env
      ```
    - Buka file `.env` dan sesuaikan nilai `DB_USER` dan `DB_PASSWORD` dengan konfigurasi database Anda.

5.  **Jalankan Server:**
    ```bash
    node app.js
    ```
    Server akan berjalan di `http://localhost:3000`.