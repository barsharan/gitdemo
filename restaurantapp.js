document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("app");
    const tableSelect = document.getElementById("tableSelect");
    const orderLists = {
        table1: document.getElementById("orderListTable1"),
        table2: document.getElementById("orderListTable2")
    };

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        takeOrder();
    });

    function takeOrder() {
        const priceInput = form.querySelector('input[name="price"]');
        const dishInput = form.querySelector('input[name="dish"]');
        const selectedTable = tableSelect.value;

        if (!priceInput.value || !dishInput.value) {
            alert("Please enter both price and dish.");
            return;
        }

        const order = {
            name: dishInput.value,
            price: parseFloat(priceInput.value)
        };

        addOrder(order, selectedTable);
        clearForm();
        saveOrdersToLocalStorage();
    }

    function addOrder(order, table) {
        const orderList = orderLists[table];
        const listItem = document.createElement("li");
        listItem.textContent = `${order.name} - ₹${order.price.toFixed(2)}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Order";
        removeButton.addEventListener("click", function () {
            removeOrder(listItem, table);
        });

        listItem.appendChild(removeButton);
        orderList.appendChild(listItem);
    }

    function clearForm() {
        form.reset();
    }

    function removeOrder(listItem, table) {
        const orderList = orderLists[table];
        orderList.removeChild(listItem);
        saveOrdersToLocalStorage();
    }

    function saveOrdersToLocalStorage() {
        const allOrders = {
            table1: getOrdersFromList("orderListTable1"),
            table2: getOrdersFromList("orderListTable2")
        };

        localStorage.setItem("orders", JSON.stringify(allOrders));
    }

    function getOrdersFromList(listId) {
        const orderList = document.getElementById(listId);
        const orders = Array.from(orderList.children).map(item => {
            const name = item.textContent.split(' - ')[0];
            const price = parseFloat(item.textContent.split(' - ₹')[1]);
            return { name, price };
        });

        return orders;
    }

    function initOrdersFromLocalStorage() {
        const savedOrders = localStorage.getItem("orders");
        if (savedOrders) {
            const allOrders = JSON.parse(savedOrders);

            Object.entries(allOrders).forEach(([table, orders]) => {
                orders.forEach(order => {
                    addOrder(order, table);
                });
            });
        }
    }

    // Initialize orders from local storage on page load
    initOrdersFromLocalStorage();
});
