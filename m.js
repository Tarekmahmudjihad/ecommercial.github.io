// Load cart from localStorage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add product to cart
function addToCart(name, price) {
  let cart = loadCart();

  // Check if product already exists
  let item = cart.find(p => p.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  alert(name + " added to cart!");
}

// Display cart in table
function displayCart() {
  if (!document.getElementById("cart-items")) return;

  let cart = loadCart();
  let cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    let total = item.price * item.quantity;
    grandTotal += total;

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
        ${item.quantity}
        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
      </td>
      <td>$${total}</td>
      <td><button class="btn-remove" onclick="removeItem(${index})">Remove</button></td>
    `;
    cartContainer.appendChild(row);
  });

  document.getElementById("grand-total").innerText = "Grand Total: $" + grandTotal;
}

// Update quantity
function updateQuantity(index, change) {
  let cart = loadCart();
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  displayCart();
}

// Remove item
function removeItem(index) {
  let cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}

// Update cart count in nav
function updateCartCount() {
  let cart = loadCart();
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  let cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) {
    cartCountElem.innerText = count;
  }
}

// Run on page load
displayCart();
updateCartCount();

