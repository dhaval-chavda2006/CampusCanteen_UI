function getRandomStatus() {
    const statuses = ["Preparing", "Ready for Pickup", "Completed"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  function displayOrders() {
    const orders = JSON.parse(localStorage.getItem("myOrders")) || [];
    const orderList = document.getElementById("orderList");
  
    if (orders.length === 0) {
      orderList.innerHTML = "<p>No recent orders.</p>";
      return;
    }
  
    let total = 0;
    const ul = document.createElement("ul");
  
    orders.forEach(item => {
      const li = document.createElement("li");
      total += item.price * item.qty;
      li.innerHTML = `
        <b>${item.name}</b> x ${item.qty} — ₹${item.price * item.qty}
      `;
      ul.appendChild(li);
    });
  
    orderList.innerHTML = `
      <h3>Order Summary</h3>
      ${ul.outerHTML}
      <p><strong>Total:</strong> ₹${total}</p>
      <p><strong>Status:</strong> ${getRandomStatus()}</p>
    `;
  }
  
  window.onload = displayOrders;
  