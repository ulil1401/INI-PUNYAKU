document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const price = button.innerText;
        alert(`You added an item to the cart for ${price}`);
    });
});