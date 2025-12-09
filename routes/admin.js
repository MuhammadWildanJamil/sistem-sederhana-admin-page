const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const purchases = await req.db('purchases')
      .select('*')
      .orderBy('purchase_date', 'desc');
    res.render('index', { purchases });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengambil data pembelian.');
  }
});


router.get('/purchases/new', async (req, res) => {
  try {
    const products = await req.db('products').select('*').where('stock', '>', 0).orderBy('name');
    res.render('new-purchase', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengambil data produk.');
  }
});


router.post('/purchases', async (req, res) => {
  const { customer_name, products } = req.body;
  const db = req.db;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).send('Pilih minimal satu produk.');
  }

  
  try {
    await db.transaction(async (trx) => {
      let totalAmount = 0;
      const productDetails = [];

      
      for (const p of products) {
        const product = await trx('products').where('id', p.productId).first();
        if (!product || product.stock < p.quantity) {
          throw new Error(`Stok untuk produk "${product.name}" tidak mencukupi.`);
        }
        totalAmount += product.price * p.quantity;
        productDetails.push({ ...p, price_at_purchase: product.price });
      }

      
      const [purchaseId] = await trx('purchases').insert({
        customer_name,
        total_amount: totalAmount,
      });

      
      const purchaseItemsData = productDetails.map(p => ({
        purchase_id: purchaseId,
        product_id: p.productId,
        quantity: p.quantity,
        price_at_purchase: p.price_at_purchase,
      }));
      await trx('purchase_items').insert(purchaseItemsData);

      
      for (const p of productDetails) {
        await trx('products')
          .where('id', p.productId)
          .decrement('stock', p.quantity);
      }
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error saat membuat pembelian:', error);
    res.status(500).send(`Terjadi kesalahan: ${error.message}`);
  }
});


router.post('/purchases/:id/cancel', async (req, res) => {
  const { id } = req.params;
  const db = req.db;

  try {
    await db.transaction(async (trx) => {
      const purchase = await trx('purchases').where('id', id).first();
      if (!purchase) throw new Error('Pembelian tidak ditemukan.');
      if (purchase.status === 'Cancelled') throw new Error('Pembelian ini sudah dibatalkan.');

      
      await trx('purchases').where('id', id).update({ status: 'Cancelled' });

      
      const items = await trx('purchase_items').where('purchase_id', id);

      
      for (const item of items) {
        await trx('products')
          .where('id', item.product_id)
          .increment('stock', item.quantity);
      }
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error saat membatalkan pembelian:', error);
    res.status(500).send(`Terjadi kesalahan: ${error.message}`);
  }
});

module.exports = router;
