// =============================================
// app.js — Shared across all pages
// Handles: products data, auth, cart, wishlist, orders
// =============================================

// ---- PRODUCTS DATABASE ----
const PRODUCTS = [
  { id: 1,  name: "Wireless Noise Cancelling Headphones", category: "electronics", price: 1499, rating: 4.5, stock: 12, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", desc: "Premium sound quality with active noise cancellation. 30-hour battery life, foldable design, and comfortable over-ear cushions perfect for travel and work." },
  { id: 2,  name: "Mechanical Gaming Keyboard", category: "electronics", price: 899,  rating: 4.3, stock: 8,  image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80", desc: "Tactile mechanical switches with RGB backlighting. Anti-ghosting, durable aluminum frame, and detachable USB-C cable for serious gamers." },
  { id: 3,  name: "Smart Watch Series X", category: "electronics", price: 1999, rating: 4.7, stock: 5,  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", desc: "Track your fitness, receive notifications, and monitor your health with GPS, heart rate sensor, SpO2 tracking and a 7-day battery." },
  { id: 4,  name: "Portable Bluetooth Speaker", category: "electronics", price: 599,  rating: 4.2, stock: 20, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", desc: "360° surround sound with deep bass. IPX7 waterproof rating, 12-hour playtime, and a built-in mic for hands-free calls." },
  { id: 5,  name: "Men's Casual Cotton T-Shirt", category: "clothing", price: 299,  rating: 4.1, stock: 50, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", desc: "100% premium cotton, pre-shrunk fabric. Available in 8 colors. Soft, breathable and perfect for everyday casual wear." },
  { id: 6,  name: "Women's Running Shoes", category: "clothing", price: 799,  rating: 4.6, stock: 15, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", desc: "Lightweight mesh upper with responsive cushioning. Designed for long-distance runs with arch support and non-slip rubber sole." },
  { id: 7,  name: "Slim Fit Denim Jeans", category: "clothing", price: 599,  rating: 4.0, stock: 30, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", desc: "Stretch denim for all-day comfort. Classic 5-pocket design with a modern slim fit. Machine washable." },
  { id: 8,  name: "Hooded Sweatshirt", category: "clothing", price: 449,  rating: 4.3, stock: 25, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80", desc: "Cozy fleece-lined hoodie with kangaroo pocket and adjustable drawstring. Perfect for cool evenings and lazy weekends." },
  { id: 9,  name: "JavaScript: The Good Parts", category: "books", price: 349,  rating: 4.8, stock: 40, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", desc: "Douglas Crockford's classic guide to the best features of JavaScript. Essential reading for any web developer." },
  { id: 10, name: "Atomic Habits", category: "books", price: 299,  rating: 4.9, stock: 60, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", desc: "James Clear's #1 New York Times bestseller on building good habits and breaking bad ones through tiny changes." },
  { id: 11, name: "The Alchemist", category: "books", price: 199,  rating: 4.7, stock: 55, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80", desc: "Paulo Coelho's magical story about following your dreams. One of the best-selling books in history." },
  { id: 12, name: "Non-Stick Cookware Set", category: "home", price: 1299, rating: 4.4, stock: 10, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", desc: "5-piece set including fry pan, saucepan, and stock pot. PFOA-free coating, induction compatible, dishwasher safe." },
  { id: 13, name: "Stainless Steel Water Bottle", category: "home", price: 349,  rating: 4.5, stock: 35, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", desc: "Double-wall vacuum insulation keeps drinks cold 24hrs or hot 12hrs. BPA-free, leak-proof lid, 750ml capacity." },
  { id: 14, name: "Yoga Mat Premium", category: "sports", price: 499,  rating: 4.6, stock: 18, image: "https://images.unsplash.com/photo-1601925228058-ee5f02cd4e7a?w=400&q=80", desc: "6mm thick non-slip TPE mat with alignment lines. Sweat-resistant surface, includes carrying strap. Eco-friendly material." },
  { id: 15, name: "Adjustable Dumbbell Set", category: "sports", price: 1799, rating: 4.7, stock: 7,  image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80", desc: "Replaces 15 sets of weights. Quick-adjust dial from 2.5kg to 25kg. Compact storage tray included." },
];

// ---- AUTH HELPERS ----
// We store users and sessions in localStorage (simulating a backend)

function getUsers() {
  return JSON.parse(localStorage.getItem("se_users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("se_users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("se_current_user") || "null");
}

function setCurrentUser(user) {
  localStorage.setItem("se_current_user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("se_current_user");
  window.location.href = "index.html";
}

// Redirect to login if not logged in
function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "index.html";
  }
}

// Redirect to shop if already logged in
function requireGuest() {
  if (getCurrentUser()) {
    window.location.href = "shop.html";
  }
}

// ---- CART HELPERS ----
function getCart() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`se_cart_${user.email}`) || "[]");
}

function saveCart(cart) {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(`se_cart_${user.email}`, JSON.stringify(cart));
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  updateCartBadge();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else { saveCart(cart); updateCartBadge(); }
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = getCartCount();
}

// ---- WISHLIST HELPERS ----
function getWishlist() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`se_wish_${user.email}`) || "[]");
}

function toggleWishlist(productId) {
  const user = getCurrentUser();
  if (!user) return;
  let wish = getWishlist();
  if (wish.includes(productId)) {
    wish = wish.filter(id => id !== productId);
  } else {
    wish.push(productId);
  }
  localStorage.setItem(`se_wish_${user.email}`, JSON.stringify(wish));
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

// ---- ORDERS HELPERS ----
function getOrders() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`se_orders_${user.email}`) || "[]");
}

function getAllOrders() {
  // Admin: get all orders across all users
  const users = getUsers();
  let all = [];
  users.forEach(u => {
    const orders = JSON.parse(localStorage.getItem(`se_orders_${u.email}`) || "[]");
    orders.forEach(o => all.push({ ...o, userEmail: u.email, userName: u.name }));
  });
  return all.sort((a, b) => b.timestamp - a.timestamp);
}

function placeOrder(orderData) {
  const user = getCurrentUser();
  if (!user) return;
  const orders = getOrders();
  const newOrder = {
    id: "ORD" + Date.now(),
    timestamp: Date.now(),
    items: getCart(),
    total: getCartTotal(),
    ...orderData,
    status: "Confirmed"
  };
  orders.push(newOrder);
  localStorage.setItem(`se_orders_${user.email}`, JSON.stringify(orders));
  saveCart([]); // clear cart after order
  return newOrder;
}

// Seed a default admin account if none exists
(function seedAdmin() {
  const users = getUsers();
  if (!users.find(u => u.email === "admin@shopease.com")) {
    users.push({ name: "Admin", email: "admin@shopease.com", password: "admin123", isAdmin: true });
    saveUsers(users);
  }
})();
