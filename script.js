document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.nav-link');
  const contents = document.querySelectorAll('.tab-content');

  function setActiveTab(target) {
    tabs.forEach(t => {
      if (t.getAttribute('href').substring(1) === target) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    contents.forEach(content => {
      if (content.id === target) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = tab.getAttribute('href').substring(1);
      setActiveTab(target);
      localStorage.setItem('activeTab', target);
    });
  });

  // Initialize: show the saved active tab or default to 'social'
  const savedTab = localStorage.getItem('activeTab') || 'social';
  setActiveTab(savedTab);

  // Store functionality for Link tab
  const linkSubmenuButtons = document.querySelectorAll('.submenu-btn');
  const submenuContents = document.querySelectorAll('.submenu-content');

  linkSubmenuButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');

      linkSubmenuButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      submenuContents.forEach(content => {
        if (content.id === target) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });

  // Store functionality inside My Store submenu
  const addToCartButtons = document.querySelectorAll('#my-store .add-to-cart');
  const cartItemsContainer = document.querySelector('#my-store .cart-items');
  const checkoutBtn = document.querySelector('#my-store .checkout-btn');
  const checkoutForm = document.querySelector('#my-store .checkout-form');
  const commentForm = document.querySelector('#my-store .comment-form');
  const commentList = document.querySelector('#my-store .comment-list');

  let cart = [];

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      cartItemsContainer.appendChild(li);
    });
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = button.closest('.product');
      const id = product.getAttribute('data-id');
      const name = product.querySelector('h3').textContent;
      cart.push({ id, name });
      renderCart();
    });
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    checkoutForm.style.display = 'block';
  });

  checkoutForm.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    renderCart();
    checkoutForm.style.display = 'none';
    e.target.reset();
  });

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = commentForm.querySelector('.comment-input');
    const commentText = input.value.trim();
    if (commentText) {
      const li = document.createElement('li');
      li.textContent = commentText;
      commentList.appendChild(li);
      input.value = '';
    }
  });
});
