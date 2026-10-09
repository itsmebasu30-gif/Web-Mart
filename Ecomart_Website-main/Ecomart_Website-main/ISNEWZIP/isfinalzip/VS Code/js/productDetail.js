
document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');

    // If no product data in URL, redirect to products page
    if (!productId || !productName) {
        window.location.href = 'Products.html';
        return;
    }

    // Decode URL parameters
    const decodedName = decodeURIComponent(productName);
    const decodedImage = decodeURIComponent(productImage);
    const decodedPrice = decodeURIComponent(productPrice);

    // Update page title
    document.title = `${decodedName} - WebMart`;

    // Update breadcrumb
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = decodedName;
    }

    // Update product image
    const productImageEl = document.getElementById('product-image');
    if (productImageEl) {
        productImageEl.src = decodedImage;
        productImageEl.alt = decodedName;
    }

    // Update product name
    const productNameEl = document.getElementById('product-name');
    if (productNameEl) {
        productNameEl.textContent = decodedName;
    }

    // Update product price
    const productPriceEl = document.getElementById('product-price');
    if (productPriceEl) {
        productPriceEl.textContent = `Rs. ${decodedPrice}`;
    }

    // Generate description based on product name
    const productDescription = document.getElementById('product-description');
    if (productDescription) {
        const desc = generateDescription(decodedName);
        if (desc) {
            productDescription.textContent = desc;
        }
    }

});

// Generate description based on product name
function generateDescription(name) {
    const descriptions = {
        'bamboo': 'Made from 100% sustainable bamboo, this eco-friendly product is biodegradable and helps reduce plastic waste. Perfect for environmentally conscious consumers.',
        'cotton': 'Crafted from premium organic cotton, this product is soft, durable, and ethically sourced. Free from harmful chemicals and pesticides.',
        'recycled': 'Made from recycled materials, this product gives new life to waste and reduces environmental impact. High quality meets sustainability.',
        'natural': 'Created with all-natural ingredients, this product is gentle on both you and the environment. No artificial additives or preservatives.',
        'compostable': 'Fully compostable and biodegradable, this product breaks down naturally without leaving harmful residues. Perfect for zero-waste living.',
        'reusable': 'Designed for multiple uses, this durable product helps eliminate single-use waste. A smart investment for sustainable living.',
        'sustainable': 'Sustainably sourced and manufactured, this product minimizes environmental footprint while maintaining premium quality.',
        'organic': 'Made with certified organic materials, this product ensures purity and sustainability from farm to your home.'
    };

    const nameLower = name.toLowerCase();
    for (const [keyword, desc] of Object.entries(descriptions)) {
        if (nameLower.includes(keyword)) {
            return desc;
        }
    }

}

