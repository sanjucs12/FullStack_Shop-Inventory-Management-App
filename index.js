//FORM SUBMIT HANDLER
async function formSubmitHandler(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  const details = {
    name: name,
    description: description,
    quantity: quantity,
    price: price,
  };
  try {
    const res = await axios.post(
      "http://localhost:3000/inventory/add-item",
      details
    );
    displayDetails(res.data.newItem);
    console.log(res.data.newItem);
  } catch (err) {
    console.log(err);
    alert("PLEASE FILL REQUIRED FIELDS");
  }
}

//DISPLAY ON SCREEN FUNCTION
function displayDetails(details) {
  const table = document.querySelector(".table");
  const tableRow = document.createElement("tr");
  tableRow.classList.add("table-row");
  tableRow.innerHTML = `
            <td>${details.name}</td>
            <td>${details.description}</td>
            <td>${details.price}</td>
            <td>${details.quantity}</td>
            <td><input type="number" id="quantity-sold"/></td>
            <td><button id="table-submit-btn">Submit</button></td>
            `;

  table.appendChild(tableRow);
  const submitButton = tableRow.querySelector("#table-submit-btn");
  submitButton.addEventListener("click", (event) => {
    tableSubmitHandler(event, details);
  });
}

//TABLE SUBMIT BUTTON
async function tableSubmitHandler(event, details) {
  const row = event.target.closest(".table-row");
  const inputValue = row.querySelector("#quantity-sold").value;
  const updatedQuantity = details.quantity - inputValue;
  //   console.log("clicked");
  //   console.log(inputValue);
  //   console.log(details);
  if (!inputValue) {
    alert("PLEASE ENTER THE NUMBER OF ITEMS TO DISPATCH");
  } else if (updatedQuantity > 0) {
    const updatedDetails = {
      name: details.name,
      description: details.description,
      quantity: updatedQuantity,
      price: details.price,
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/inventory/update-item/${details.id}`,
        updatedDetails
      );
      console.log(response);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  } else if (updatedQuantity === 0) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/inventory/delete-item/${details.id}`
      );
      location.reload();
      alert(`${details.name} : IS OUT OF STOCK..!`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  } else if (updatedQuantity < 0) {
    alert(
      `Quantity not available....!!!Available Quantity : ${details.quantity}`
    );
  }
}

//DOM CONTENT LOADED
window.addEventListener("DOMContentLoaded", getRequest);
function getRequest() {
  axios
    .get("http://localhost:3000/inventory/get-items")
    .then((res) => {
      // console.log(res);
      res.data.map((item) => {
        displayDetails(item);
      });
    })
    .catch((err) => {
      console.log(err);
      alert("SOMETHING WENT WRONG:PLEASE TRY AGAIN");
    });
}
