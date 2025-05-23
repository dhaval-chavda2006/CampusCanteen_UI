
    
    const foodItems = [
      { id: 1, name: "Samosa", price: 20, img: "images/samosa.jpeg", category: "Snacks" },
      { id: 2, name: "Burger", price: 70, img: "images/burger.jpeg", category: "Snacks" },
      { id: 3, name: "Tea", price: 10, img: "images/chai.jpeg", category: "Drinks" },
      { id: 4, name: "Coca Cola", price: 100, img: "images/coca cola.jpeg", category: "Drinks" },
      { id: 5, name: "Coffee", price: 10, img: "images/coffee.jpeg", category: "Drinks" },
      { id: 6, name: "Pizza", price: 120, img: "images/pizza.jpeg", category: "Meals" },
      { id: 7, name: "Vadapav", price: 30, img: "images/vadapav.jpeg", category: "Snacks" },
      { id: 8, name: "Thumbs Up", price: 20, img: "images/thumbs up.jpeg", category: "Drinks" },
      { id: 9, name: "Idli", price: 50, img: "images/idli.jpeg", category: "Meals" }
    ];

    const categories = ["All", ...Array.from(new Set(foodItems.map(item => item.category)))];

    let selectedCategory = "All";
    let searchTerm = "";

   
    const cart = [];

 
    function getUserName() {
      let name = localStorage.getItem("canteenUserName");
      if (!name) {
        name = prompt("Welcome! Please enter your name:");
        name = name ? name.trim() : "Guest";
        localStorage.setItem("canteenUserName", name);
      }
      return name;
    }
    function renderGreeting() {
      const name = getUserName();
      const greetingDiv = document.getElementById("greeting");
      greetingDiv.innerHTML = `<span class="material-icons" style="font-size:1.3em;">waving_hand</span> Welcome back, <b>${name}</b>!`;
    }

    
    function setTheme(isDark) {
      if (isDark) {
        document.body.classList.add("dark-theme");
        document.getElementById("themeIcon").innerText = "light_mode";
      } else {
        document.body.classList.remove("dark-theme");
        document.getElementById("themeIcon").innerText = "dark_mode";
      }
      localStorage.setItem("canteenTheme", isDark ? "dark" : "light");
    }
    function initTheme() {
      const pref = localStorage.getItem("canteenTheme");
      setTheme(pref === "dark");
    }
    document.getElementById("themeToggle").onclick = () => {
      const isDark = !document.body.classList.contains("dark-theme");
      setTheme(isDark);
    };

   
    function renderTabs() {
      const tabsDiv = document.getElementById("tabs");
      tabsDiv.innerHTML = "";
      categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className = "tab" + (cat === selectedCategory ? " active" : "");
        btn.onclick = () => {
          selectedCategory = cat;
          renderTabs();
          filterMenu();
        };
        tabsDiv.appendChild(btn);
      });
    }

  
    function filterMenu() {
      const menu = document.getElementById("menu");
      searchTerm = document.getElementById("searchInput").value.toLowerCase();
      menu.innerHTML = "";
      let filtered = foodItems.filter(item => 
        (selectedCategory === "All" || item.category === selectedCategory) &&
        item.name.toLowerCase().includes(searchTerm)
      );
      if (filtered.length === 0) {
        menu.innerHTML = `<div style="font-size:1.3em;color:#e53935;">No items found!</div>`;
        return;
      }
      filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${item.img}" alt="${item.name}" />
          <div class="card-content">
            <h3>
              <span class="material-icons" style="font-size:1.1em;">restaurant</span>
              ${item.name}
            </h3>
            <p>₹${item.price}</p>
            <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
          </div>`;
        menu.appendChild(card);
      });
    }

    function renderMenu() {
      renderTabs();
      filterMenu();
    }

    function addToCart(item) {
      const existing = cart.find(i => i.id === item.id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ ...item, qty: 1 });
      }
      updateCart();
    }

    function updateCart() {
      const cartItems = document.getElementById("cart-items");
      const totalElement = document.getElementById("total");
      cartItems.innerHTML = "";
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.textContent = `${item.name} x ${item.qty}`;
        cartItems.appendChild(li);
      });
      totalElement.textContent = total;
    }

    function placeOrder() {
      if (cart.length === 0) return alert("Cart is empty!");
      localStorage.setItem("myOrders", JSON.stringify(cart));
      alert("Order Placed Successfully!");
      cart.length = 0;
      updateCart();
    }

    
    window.onload = function() {
      renderGreeting();
      initTheme();
      renderMenu();
      updateCart();
    };
  