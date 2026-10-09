// Cart Logic
const CART_KEY = 'webmart_cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

// Update Cart Badge
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = totalItems;

        badge.style.transform = "scale(1.2)";
        setTimeout(() => {
            badge.style.transform = "scale(1)";
        }, 200);
    }
}

function renderIfOpen() {
    const modal = document.getElementById("cartModal");
    if (modal && modal.style.display === "block") {
        renderCartItems();
    }
}
// Save Cart
function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderIfOpen();
}

// Add to Cart Function
function addToCart(btn) {
    const card = btn.closest('.product-card');
    const { id, name, price: priceStr, image } = card.dataset;
    const price = parseFloat(priceStr) || 0;

    const quantityInput = card.querySelector('.qty-input');
    const quantity = parseInt(quantityInput.value) || 1;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity
        });
    }

    saveCart();

    // Changing button stylin when clicked on add to cart button
    const originalText = btn.textContent;
    btn.textContent = "Added!";
    btn.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = "";
    }, 1000);

    // Reset quantity input to 1
    if (quantityInput) quantityInput.value = 1;
}

// Remove from Cart
window.removeFromCart = function (id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCartItems(); // Force render
}

// Update Cart Quantity (Increment/Decrement inside Cart)
window.updateCartQuantity = function (id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }
    saveCart();
    renderCartItems();
}

// Render Cart Items
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !totalElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">Rs. ${item.price} x ${item.quantity} = Rs. ${itemTotal}</span>
                    <div class="cart-item-controls">
                        <button class="qty-btn small" onclick="updateCartQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn small" onclick="updateCartQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Remove Item">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    totalElement.textContent = total;
}

// Open Cart Modal
function openCart() {
    const modal = document.getElementById("cartModal");
    if (modal) {
        renderCartItems();
        modal.style.display = "block";
    }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // Attach event listeners to all Add to Cart buttons
    const addBtns = document.querySelectorAll('.add-to-cart-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            addToCart(this);
        });
    });

    // Attach event listeners to +/- buttons on product cards
    const qtyBtns = document.querySelectorAll('.qty-btn');
    qtyBtns.forEach(btn => {
        // Skip cart modal buttons (they are dynamic and handled by inline onclick for simplicity or we can delegate)
        if (btn.closest('.cart-modal')) return;

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const input = this.parentElement.querySelector('.qty-input');
            let val = parseInt(input.value) || 1;

            if (this.classList.contains('plus')) {
                val++;
            } else if (this.classList.contains('minus')) {
                if (val > 1) val--;
            }
            input.value = val;
        });
    });

    // Cart Modal Logic
    const modal = document.getElementById("cartModal");
    const btn = document.getElementById("cart-btn");
    const closeSpan = document.querySelector(".close-cart");

    if (btn) {
        btn.onclick = function (event) {
            event.preventDefault();
            openCart();
        }
    }

    if (closeSpan) {
        closeSpan.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Close when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    const buyBtn = document.querySelector('.buy-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }
            alert('Thank you for your purchase!');
            cart = [];
            saveCart();
        });
    }
});
