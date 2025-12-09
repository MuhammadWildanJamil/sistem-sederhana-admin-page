const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'xionco_admin',     
    password: 'wildanjamil23', 
    database: 'xionco_db',     
  },
});

async function setup() {
  console.log('Memulai setup database MySQL...');

  try {
    
    await knex.schema.dropTableIfExists('purchase_items');
    await knex.schema.dropTableIfExists('purchases');
    await knex.schema.dropTableIfExists('products');
    console.log('Tabel lama berhasil dihapus.');

    
    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.decimal('price', 15, 2).notNullable();
      table.integer('stock').unsigned().notNullable();
    });
    console.log('Tabel "products" berhasil dibuat.');

    
    await knex.schema.createTable('purchases', (table) => {
      table.increments('id').primary();
      table.string('customer_name').notNullable();
      table.timestamp('purchase_date').defaultTo(knex.fn.now());
      table.decimal('total_amount', 15, 2).notNullable();
      table.string('status').defaultTo('Completed'); // Status: 'Completed' atau 'Cancelled'
    });
    console.log('Tabel "purchases" berhasil dibuat.');

    
    await knex.schema.createTable('purchase_items', (table) => {
      table.increments('id').primary();
      table.integer('purchase_id').unsigned().references('id').inTable('purchases').onDelete('CASCADE');
      table.integer('product_id').unsigned().references('id').inTable('products');
      table.integer('quantity').unsigned().notNullable();
      table.decimal('price_at_purchase', 15, 2).notNullable();
    });
    console.log('Tabel "purchase_items" berhasil dibuat.');

    
    const products = [
      { name: 'Xionco Lophus - Bar Stool Kursi Bar Cafe"', price: 1406000, stock: 15 },
      { name: 'Xionco De Lune Series | SW04 | ', price: 4930000, stock: 50 },
      { name: 'Xionco De Lune Series | SW14 |', price: 3632000, stock: 30 },
      { name: 'Xionco Orycto"', price: 3708000, stock: 10 },
      { name: 'Xionco Nora - Bar Stool ', price: 1028000, stock: 25 },
      { name: 'Xionco Capra Deluxe', price: 5960000, stock: 40 },
      { name: 'Xionco Nora - Dining Chair', price: 1088000, stock: 20 },
      { name: 'Xionco Guise - Ottoman Minimalis', price: 1421000, stock: 18 },
      { name: 'Xionco Capra Deluxe Ottoman', price: 3732000, stock: 22 },
      { name: 'Xionco Tesse', price: 449000, stock: 35 },
    ];
    await knex('products').insert(products);
    console.log('10 data produk awal berhasil ditambahkan.');

    console.log('Setup database MySQL selesai!');
  } catch (error) {
    console.error('Error saat setup database:', error);
  } finally {
    await knex.destroy(); 
  }
}

setup();
