document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('add-product-btn');
    const productList = document.getElementById('product-list');
    const productRowTemplate = document.getElementById('product-row-template');
    const form = document.getElementById('purchase-form');
    let productIndex = 0;

    const addProductRow = () => {
        const newRowFragment = productRowTemplate.content.cloneNode(true);
        const productRowDiv = newRowFragment.querySelector('.product-row');
        
        
        newRowFragment.querySelector('select').name = `products[${productIndex}][productId]`;
        newRowFragment.querySelector('input[type="number"]').name = `products[${productIndex}][quantity]`;
        
        
        newRowFragment.querySelector('.remove-product-btn').addEventListener('click', () => {
            productRowDiv.remove();
        });

        
        const quantityInput = newRowFragment.querySelector('.quantity-input');
        const productSelect = newRowFragment.querySelector('.product-select');
        productSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const stock = selectedOption.getAttribute('data-stock');
            if (stock) {
                quantityInput.max = stock;
                if (parseInt(quantityInput.value) > parseInt(stock)) {
                    quantityInput.value = stock;
                }
            } else {
                quantityInput.removeAttribute('max');
            }
        });

        productList.appendChild(newRowFragment);
        productIndex++;
    };

    
    addProductRow();

    
    addProductBtn.addEventListener('click', addProductRow);

    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const customerName = formData.get('customer_name');
        
        const products = [];
        const productRows = document.querySelectorAll('.product-row');
        
        let isValid = true;
        productRows.forEach((row) => {
            const productId = row.querySelector('select').value;
            const quantity = row.querySelector('input[type="number"]').value;

            if (productId && quantity > 0) {
                products.push({
                    productId: parseInt(productId),
                    quantity: parseInt(quantity)
                });
            } else if (productId || quantity) {
                
                isValid = false;
            }
        });

        if (!isValid || products.length === 0) {
            alert('Pastikan semua baris produk terisi dengan benar dan minimal ada satu produk.');
            return;
        }

        try {
            const response = await fetch('/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_name: customerName, products }),
            });

            if (response.ok) {
                window.location.href = '/'; 
            } else {
                const errorText = await response.text();
                alert(`Gagal menyimpan pembelian: ${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan koneksi saat mengirim data.');
        }
    });
});
