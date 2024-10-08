let cart = [];
let bal = 1000.00;
let Total = 0;
document.getElementById("Bal").innerHTML = bal;
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

function showQuantityInput(productId, productName) {
    document.getElementById(`popup-quantity-${productId}`).style.display = 'block';

    const quantityInput = document.getElementById(`quantity-input-${productId}`);
    quantityInput.style.display = 'block';

    document.getElementById(`product-name-${productId}`).innerText = productName;
    document.getElementById(`quantity-input-${productId}`).focus();
}


function addProductToCart(productId, productName, price) {
    const quantity = parseInt(document.getElementById(`quantity-input-${productId}`).value);

    if (quantity > 0) {
        addToCart(productId, productName, price, quantity);
        alert(`${quantity} x ${productName} added to your cart!`);
        document.getElementById(`quantity-input-${productId}`).style.display = 'none';
    } 
    else {
        alert('Please enter a valid quantity.');
    }
}

function closePopup(productId) {
    document.getElementById(`popup-quantity-${productId}`).style.display = 'none';
}

function addToCart(productId, productName, price, quantity) {
    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity; 
    } else {
        cart.push({ productId, productName, price, quantity });
    }

    showCart();
}

function openCartPopup() {
    document.getElementById('cart-popup').style.display = 'block';
}

function closeCartPopup() {
    document.getElementById('cart-popup').style.display = 'none';
}

function showCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        itemDiv.innerHTML = `
            <p><strong>${item.productName}</strong></p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.productId})">Remove</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    Total=totalAmount;

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<h3>Total Amount: $${totalAmount.toFixed(2)}</h3>`;

    cartContainer.appendChild(totalDiv);
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        cart.splice(itemIndex, 1); 
    }
    showCart();
}

function checkout() {
    const cartTotal = Total;
    if (bal >= cartTotal) {
        bal -= cartTotal; 
        alert(`Checkout successful! Your new balance is: $${bal.toFixed(2)}`);
        cart = [];
        Total = 0;
        updateCartUI();
    } else {
        alert("Insufficient balance for this transaction.");
    }
}

function updateCartUI() {
    document.getElementById("Bal").innerHTML = bal.toFixed(2); 
    showCart();  
}
