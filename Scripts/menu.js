window.addEventListener("DOMContentLoaded", function () {
  let order = [];

  let button = document.querySelectorAll(".order-button");

  button.forEach((button) => {
    button.addEventListener("click", () => {
      button.style.backgroundColor = "var(--dark)";
      button.style.color = "var(--white)";
      button.innerText = "Added to Order";

      let item = button.dataset.item;
      let price = button.dataset.price;

      let orderItem = { Item: item, Price: price };

      localStorage.setItem("order", JSON.stringify(order));

      console.log(orderItem);

      button.disabled = true;
    });
  });
});
