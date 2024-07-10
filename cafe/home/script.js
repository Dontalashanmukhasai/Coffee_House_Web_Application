let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;
    };
});
// Add this script to script.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
    } else {
        // Submit the form or perform further actions
        alert('Login successful!');
    }
});
// Custom JS File (script.js)

document.addEventListener('DOMContentLoaded', function () {
    const createAccountForm = document.getElementById('createAccountForm');

    createAccountForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
        } else {
            alert('Account created successfully!');
            // You can submit the form or send the data to your server here
            // createAccountForm.submit();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.querySelector('#new-username').value;
            const password = document.querySelector('#new-password').value;
            const confirmPassword = document.querySelector('#cnfpassword').value;

            if (password === confirmPassword) {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Sign up successful! Please log in.');
                window.location.href = 'index.html';
            } else {
                alert('Passwords do not match.');
            }
        });
    }

    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;
            loggedInUser = users.find(user => user.username === username && user.password === password);
            if (loggedInUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    const logoutLink = document.querySelector('#logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            loggedInUser = null;
            localStorage.removeItem('loggedInUser');
            alert('You have logged out.');
            window.location.href = 'index.html';
        });
    }

    function checkAuthentication() {
        if (!loggedInUser) {
            alert('You must be logged in to access this page.');
            window.location.href = 'login.html';
        }
    }

    // Protect listings and profile pages
    if (window.location.pathname.endsWith('listings.html') || window.location.pathname.endsWith('profile.html') || window.location.pathname.endsWith('home.html')) {
        checkAuthentication();
    }
});
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart-button').forEach((button, index) => {
    button.addEventListener('click', () => {
        addToCart(items[index]);
    });
});

function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        document.getElementById('cart-total').innerText = total.toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', updateCart);

document.getElementById('checkout').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // Add further checkout functionality here
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        }
    },
});