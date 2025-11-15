// Save cart to localStorage
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// Display cart items
if (document.getElementById("cart-items")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let total = 0;

    cart.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `${item.name} - $${item.price}`;
        cartContainer.appendChild(div);
        total += item.price;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}


// === Hero Slider ===
let slideIndex = 0;
let autoSlide;

function showSlide(n) {
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.style.display = (i === slideIndex) ? "flex" : "none";
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === slideIndex);
  });
}

function changeSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
  resetAutoSlide();
}

function currentSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
  resetAutoSlide();
}

function autoPlaySlides() {
  slideIndex++;
  showSlide(slideIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(autoPlaySlides, 4000); // auto every 4s
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
  autoSlide = setInterval(autoPlaySlides, 4000);
});








// Sample product data (can load from JSON/API later)
const products = [
  { name: "MackBook", price: 2100, img: "MB1.webp" },
  { name: "Mackbook", price: 1700, img: "mb2.webp" },
  { name: "Lenovo", price: 250, img: "tp1.png" },
  { name: "DELL", price: 450, img: "dell1.avif" },
  { name: "HP", price: 700, img: "hp1.avif" },
  { name: "S26 Ultra", price: 1225, img: "s1.jpeg" },
  { name: "S25 Ultra", price: 1050, img: "s2.avif" },
  { name: "15 Pro Max", price: 1120, img: "iphone1.jpeg" },
  { name: "16 Pro Max", price: 1999, img: "iphone2.jpeg" },
  { name: "Vivo X200", price: 899, img: "v1.jpeg" },
  { name: "Headphones", price: 30, img: "H2 pro.avif" },
  { name: "TWS", price: 50, img: "M75.avif" },
  { name: "SmartWatch", price: 100, img: "S6 BT.jpg" },
  { name: "SmartWatch", price: 80, img: "smart watch.jpeg" },
  { name: "Wearless", price: 75, img: "wireless.jpg" },
  { name: "Keyboard", price: 199, img: "key.jpg" },
];

// Show products dynamically
const productList = document.getElementById("product-list");
if (productList) {
  products.forEach(p => {
    let card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Add product to cart
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

// Update cart count in nav
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
}

// Run on page load
updateCartCount();




// === Auth Modal ===
function openModal() {
  document.getElementById("authModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

function showTab(tab) {
  document.querySelectorAll(".form").forEach(f => f.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  if (tab === "login") {
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("loginTab").classList.add("active");
  } else {
    document.getElementById("registerForm").classList.add("active");
    document.getElementById("registerTab").classList.add("active");
  }
}

// Close modal if clicked outside
window.onclick = function(event) {
  let modal = document.getElementById("authModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Demo form handling
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Logged in (demo)!");
  closeModal();
});

document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Registered (demo)!");
  closeModal();
});




// === Auth Modal with localStorage ===

// Open/Close modal
function openModal() {
  document.getElementById("authModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

// Show tabs
function showTab(tab) {
  document.querySelectorAll(".form").forEach(f => f.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  if (tab === "login") {
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("loginTab").classList.add("active");
  } else {
    document.getElementById("registerForm").classList.add("active");
    document.getElementById("registerTab").classList.add("active");
  }
}

// Save user in localStorage
function saveUser(name, email) {
  localStorage.setItem("user", JSON.stringify({ name, email }));
  updateNavbar();
}

// Logout
function logoutUser() {
  localStorage.removeItem("user");
  updateNavbar();
}

// Update navbar (Login → Username / Logout)
function updateNavbar() {
  const authLink = document.getElementById("authLink");
  let user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    authLink.innerHTML = `👤 ${user.name} (Logout)`;
    authLink.onclick = logoutUser;
  } else {
    authLink.innerHTML = "Login";
    authLink.onclick = openModal;
  }
}

// Form handling
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  let email = e.target.querySelector("input[type='email']").value;
  let name = email.split("@")[0]; // Fake name from email
  saveUser(name, email);
  closeModal();
});

document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  let name = e.target.querySelector("input[type='text']").value;
  let email = e.target.querySelector("input[type='email']").value;
  saveUser(name, email);
  closeModal();
});

// Close modal if clicked outside
window.onclick = function(event) {
  let modal = document.getElementById("authModal");
  if (event.target === modal) {
    closeModal();
  }
};

// On page load
document.addEventListener("DOMContentLoaded", updateNavbar);



// === Auth Modal with localStorage ===

// Open/Close modal
function openModal() {
  document.getElementById("authModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

// Show tabs
function showTab(tab) {
  document.querySelectorAll(".form").forEach(f => f.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  if (tab === "login") {
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("loginTab").classList.add("active");
  } else {
    document.getElementById("registerForm").classList.add("active");
    document.getElementById("registerTab").classList.add("active");
  }
}

// Save user in localStorage
function saveUser(name, email) {
  localStorage.setItem("user", JSON.stringify({ name, email }));
  updateNavbar();
}

// Logout
function logoutUser() {
  localStorage.removeItem("user");
  updateNavbar();
}

// Update navbar (Login → Username / Logout)
function updateNavbar() {
  const authLink = document.getElementById("authLink");
  let user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    authLink.innerHTML = `👤 ${user.name} (Logout)`;
    authLink.onclick = logoutUser;
  } else {
    authLink.innerHTML = "Login";
    authLink.onclick = openModal;
  }
}

// === FORM HANDLING ===
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  let email = e.target.querySelector("input[type='email']").value;
  let name = email.split("@")[0]; // Fake name from email
  saveUser(name, email);

  e.target.reset();   // ✅ Clear login form
  closeModal();
});

document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  let name = e.target.querySelector("input[type='text']").value;
  let email = e.target.querySelector("input[type='email']").value;
  saveUser(name, email);

  e.target.reset();   // ✅ Clear register form
  closeModal();
});

// Close modal if clicked outside
window.onclick = function(event) {
  let modal = document.getElementById("authModal");
  if (event.target === modal) {
    closeModal();
  }
};

// On page load
document.addEventListener("DOMContentLoaded", updateNavbar);


// Display products
function displayProducts(filtered = products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Initial display
displayProducts();

// Search products
function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
  displayProducts(filtered);
}

// Filter by price
function filterProducts() {
  const filter = document.getElementById("priceFilter").value;
  let filtered = [...products];

  if (filter !== "all") {
    const [min, max] = filter.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  // Combine with search
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
  }

  displayProducts(filtered);
}


// Add to cart function
function addToCart(name, price, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Display cart items
function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";

  let grandTotal = 0;
  cart.forEach((item, index) => {
    const total = item.price * item.quantity;
    grandTotal += total;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
      <td>$${total}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    cartItems.appendChild(row);
  });

  document.getElementById("grand-total").innerText = `Grand Total: $${grandTotal}`;
}

// Update quantity
function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Remove item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}


const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

form.addEventListener("submit", function(e){
  e.preventDefault();
  
  const formData = new FormData(form);
  
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if(response.ok) {
      status.innerText = "Message sent successfully!";
      form.reset(); // Clear the form
    } else {
      status.innerText = "Oops! There was a problem.";
    }
  })
  .catch(error => {
    status.innerText = "Oops! There was a problem.";
  });
});
