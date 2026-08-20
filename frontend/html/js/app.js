// Foodie frontend - talks to Spring Boot backend via nginx reverse proxy (/api/*)

const API_BASE = "/api";

function getCart() {
  return JSON.parse(localStorage.getItem("foodie_cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("foodie_cart", JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}
function addToCart(dish) {
  const cart = getCart();
  const existing = cart.find(i => i.id === dish.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...dish, qty: 1 });
  saveCart(cart);
  alert(dish.name + " added to cart!");
}

// Fetch dishes from backend API and render
async function loadDishes(targetId, limit) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const res = await fetch(`${API_BASE}/dishes`);
    if (!res.ok) throw new Error("API error " + res.status);
    let dishes = await res.json();
    if (limit) dishes = dishes.slice(0, limit);
    renderDishes(target, dishes, targetId);
  } catch (err) {
    target.innerHTML = `<p style="color:#c00">Could not load dishes from backend API (${err.message}). Is the backend container running?</p>`;
  }
}

// Fallback food images (used when backend doesn't have an imageUrl set)
const FOOD_IMAGES = {
  "Margherita Pizza": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&q=80",
  "Chicken Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
  "Chicken Biryani": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
  "Pasta Alfredo": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80",
  "Chocolate Cake": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80"
};
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80";
function imageFor(d) {
  return d.imageUrl || FOOD_IMAGES[d.name] || FALLBACK_IMAGE;
}

function renderDishes(target, dishes, mode) {
  if (mode === "menu-list") {
    target.innerHTML = dishes.map(d => `
      <div class="menu-item" onclick="location.href='product.html?id=${d.id}'">
        <img src="${imageFor(d)}" alt="${d.name}" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
        <div class="menu-item-info">
          <h3>${d.name}</h3>
          <p>${d.description || ""}</p>
          <span class="price">₹${d.price}</span>
        </div>
        <button class="add-btn" onclick='event.stopPropagation(); addToCart(${JSON.stringify(d)})'>Add +</button>
      </div>
    `).join("");
  } else {
    target.innerHTML = dishes.map(d => `
      <div class="dish-card" onclick="location.href='product.html?id=${d.id}'">
        <img src="${imageFor(d)}" alt="${d.name}" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
        <h3>${d.name}</h3>
        <p>⭐ ${d.rating || "4.5"} · ₹${d.price}</p>
      </div>
    `).join("");
  }
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = "Cart is empty. Go to Menu and add items!";
  } else {
    container.innerHTML = cart.map(i => `
      <div class="cart-item">
        <img src="${imageFor(i)}" alt="${i.name}">
        <div style="flex:1;">
          <strong>${i.name}</strong>
          <p style="color:#888;font-size:13px;">Qty: ${i.qty}</p>
        </div>
        <span>₹${i.price * i.qty}</span>
      </div>
    `).join("");
  }
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal + (cart.length ? 30 : 0);
  document.getElementById("subtotal").textContent = "₹" + subtotal;
  document.getElementById("total").textContent = "₹" + total;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  if (document.getElementById("dish-list")) loadDishes("dish-list", 4);
  if (document.getElementById("menu-list")) loadDishes("menu-list");
  if (document.getElementById("cart-items")) renderCart();
});
