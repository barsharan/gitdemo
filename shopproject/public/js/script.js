// Fetch products from the server and display them on the products page
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Clear previous content
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.innerHTML = `<p>ID: ${product.id}, Name: ${product.name}, Price: ${product.price}</p>`;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
