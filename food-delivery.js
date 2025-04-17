const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 12.99,
        image: "https://via.placeholder.com/300x200",
        description: "Fresh tomatoes, mozzarella, basil"
    },
    {
        id: 2,
        name: "Classic Burger",
        category: "burger",
        price: 8.99,
        image: "https://via.placeholder.com/300x200",
        description: "Beef patty, lettuce, tomato, cheese"
    },
    {
        id: 3,
        name: "California Roll",
        category: "sushi",
        price: 10.99,
        image: "https://via.placeholder.com/300x200",
        description: "Crab, avocado, cucumber"
    },
];


let cart = [];


const foodGrid = document.getElementById('food-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');


function displayMenuItems(items) {
    foodGrid.innerHTML = items.map(item => `
        <div class="food-card" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}">
            <div class="food-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
}


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        if (category === 'all') {
            displayMenuItems(menuItems);
        } else {
            const filteredItems = menuItems.filter(item => item.category === category);
            displayMenuItems(filteredItems);
        }
    });
});


function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
}


foodGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.dataset.id);
        const item = menuItems.find(item => item.id === id);
        
        const existingItem = cart.find(cartItem => cartItem.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        updateCart();
        cartModal.classList.add('active');
    }
});


cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
        const id = parseInt(e.target.dataset.id);
        const action = e.target.dataset.action;
        
        const item = cart.find(item => item.id === id);
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity--;
            if (item.quantity === 0) {
                cart = cart.filter(cartItem => cartItem.id !== id);
            }
        }
        
        updateCart();
    }
});


cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
});


checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    checkoutModal.classList.add('active');
});

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    updateCart();
    checkoutModal.classList.remove('active');
    cartModal.classList.remove('active');
});


checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
});


displayMenuItems(menuItems);
updateCart();