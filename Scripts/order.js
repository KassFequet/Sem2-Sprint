window.addEventListener('DOMContentLoaded', function () {
  // Show locations when the button is clicked
  const locationsButton = document.getElementById('locationsButton');
  const locationsParagraph = document.getElementById('locations');

  locationsButton.addEventListener('click', function () {
    locationsParagraph.innerHTML =
      '<ul><li>123 Water St.</li><li>321 Bean Blvd.</li><li>789 Espresso Ave.</li></ul>';
  });

  // Inisitialize the order array
  let order = [];
  let button = document.querySelectorAll('.order-button');
  // Add event listeners to each order button
  button.forEach((button) => {
    button.addEventListener('click', () => {
      button.style.backgroundColor = 'var(--dark)';
      button.style.color = 'var(--white)';
      button.innerText = 'Added to Order';

      let item = button.dataset.item;
      let price = button.dataset.price;

      let orderItem = { Item: item, Price: price };

      // Add the item to the order array
      order.push(orderItem);

      // Save updated order to localStorage
      localStorage.setItem('order', JSON.stringify(order));

      console.log(orderItem);

      // Update the order display after adding an item
      displayOrderItems();

      button.disabled = true;
    });
  });

  // Clear order button
  const clearOrderButton = document.getElementById('clearOrder');
  clearOrderButton.addEventListener('click', () => {
    // Clear the order array
    order = [];
    // Remove the order from localStorage
    localStorage.removeItem('order');
    // Update the display
    displayOrderItems();
    // Clear the total displayed
    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice) {
      totalPrice.innerText = 'Total: $0.00';
    }
    // Reset button styles
    button.forEach((btn) => {
      btn.style.backgroundColor = '';
      btn.style.color = '';
      btn.innerText = 'Add to Order';
      btn.disabled = false;
    });
  });

  // Load the order from localStorage
  const savedOrder = localStorage.getItem('order');
  if (savedOrder) {
    order = JSON.parse(savedOrder);
    console.log('Existing order:', order);
    updateButtonStates();
  }

  // Function to update button states based on items in order
  function updateButtonStates() {
    const buttons = document.querySelectorAll('.order-button');
    buttons.forEach((button) => {
      const itemName = button.dataset.item;
      // Check if this item is in the order
      const isInOrder = order.some((orderItem) => orderItem.Item === itemName);

      if (isInOrder) {
        button.style.backgroundColor = 'var(--dark)';
        button.style.color = 'var(--white)';
        button.innerText = 'Added to Order';
        button.disabled = true;
      }
    });
  }

  // Display the order items
  function displayOrderItems() {
    const orderList = document.getElementById('orderList');

    // Clear contents
    orderList.innerHTML = '';

    if (order.length === 0) {
      orderList.innerHTML = '<p class="empty-order">Your order is empty</p>';
      return;
    }

    // Create the items list for display
    let orderHTML = '<ul class="order-summary-list">';
    //
    order.forEach((item, index) => {
      orderHTML += `
          <li>
            <div class="quantity-controls">
                <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
                <input type="number" class="quantity-input" value="${
                  item.Quantity || 1
                }" min="1" onchange="updateQuantity(${index}, this.value, true)">
                <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
        <span class="order-item-name">${item.Item}</span>
        <span class="order-item-price">$${(
          parseFloat(item.Price) * (item.Quantity || 1)
        ).toFixed(2)}</span>
        </li>
        `;
    });

    orderHTML += '</ul>';

    orderList.innerHTML = orderHTML;
  }
  // Update the order quantity
  window.updateQuantity = function (index, change, isInputChange = false) {
    if (isInputChange) {
      // If it's an input change, set the quantity directly
      const input = document.querySelectorAll('.quantity-input')[index];
      const newQuantity = parseInt(input.value, 10);
      if (newQuantity < 1) return; // Prevent setting quantity less than 1
      order[index].Quantity = newQuantity;
    } else {
      // If not, adjust the quantity by the change amount
      if (!order[index].Quantity) order[index].Quantity = 1; // Initialize quantity if not set
      order[index].Quantity += change;
      if (order[index].Quantity < 1) order[index].Quantity = 1; // Prevent negative quantities
    }

    // Save updated order to localStorage
    localStorage.setItem('order', JSON.stringify(order));

    // Refresh the display
    displayOrderItems();
  };

  // Calculate total order cost and display it on button click
  const calculateTotalButton = document.getElementById('calculateTotal');
  calculateTotalButton.addEventListener('click', () => {
    let total = order.reduce((sum, item) => {
      return sum + parseFloat(item.Price) * (item.Quantity || 1);
    }, 0);
    const totalPrice = document.getElementById('totalPrice');
    totalPrice.innerText = `Total: $${total.toFixed(2)}`;
  });

  // Submit order handler
  const placeOrderButton = document.getElementById('placeOrder');
  placeOrderButton.addEventListener('click', () => {
    if (order.length === 0) {
      alert('Your order is empty. Please add items before placing an order.');
      return;
    }

    // Make sure the customer has entered their name
    const nameInput = document.getElementById('name');
    const customerName = nameInput.value.trim();
    if (!customerName) {
      alert('Please enter your name before placing an order.');
      return;
    }

    // Check if the phone and address fields are filled
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    if (!phoneInput.value.trim() || !addressInput.value.trim()) {
      alert(
        'Please provide your phone number and address before placing an order.'
      );
      return;
    }

    // Confirm the order
    showCustomConfirm(
      'Are you sure you want to place this order?',
      (confirmed) => {
        if (confirmed) {
          // Clear the order and localStorage
          localStorage.removeItem('order');
          order = [];
          displayOrderItems();

          showNotification(
            `Thank you for your order, ${customerName}! Your delivery will be sent to ${addressInput.value}.`
          );

          // Clear the form inputs
          nameInput.value = '';
          phoneInput.value = '';
          addressInput.value = '';

          // Reset button states
          button.forEach((btn) => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.innerText = 'Add to Order';
            btn.disabled = false;
          });
        }
      }
    );
  });

  // Custom confirmation box
  function showCustomConfirm(message, callback) {
    const modal = document.createElement('div');
    modal.className = 'confirm-box';
    modal.innerHTML = `
      <div class="confirm-content">
        <p>${message}</p>
        <div class="confirm-buttons">
          <button class="confirm-btn yes-btn">Yes</button>
          <button class="confirm-btn no-btn">No</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners for the buttons
    modal.querySelector('.yes-btn').addEventListener('click', () => {
      document.body.removeChild(modal);
      callback(true);
    });

    modal.querySelector('.no-btn').addEventListener('click', () => {
      document.body.removeChild(modal);
      callback(false);
    });
  }

  // Show order confirmed notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 4000);
  }

  // Display order items when the page loads
  displayOrderItems();
});
