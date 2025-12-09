const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
require('dotenv').config(); // Muat variabel dari file .env

const app = express();
const PORT = process.env.PORT || 3000;


const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
  req.db = knex;
  next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', adminRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
