//inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let image=document.getElementById("outputImg");
let searchBy = document.getElementById("search");
//buttons
let deleteAllBtn = document.getElementById("deleteAll");
let createBtn = document.getElementById("createBtn");
let updateBtn = document.getElementById("updateBtn");
//outputs
let tbody = document.querySelector("tbody");

function calculiTotal() {
  if (price.value > 0) {
    total.style.backgroundColor = "green";
    total.innerHTML = +price.value + +taxes.value + +ads.value - discount.value;
    if (taxes.value < 0 || ads.value < 0 || discount.value < 0 || +total.innerHTML <0) {
      total.style.backgroundColor = "red";
      total.innerHTML = "";
    }
  } else {
    total.style.backgroundColor = "red";
    total.innerHTML = "";
  }
}

let source;
function showChosenImg(event){
  image.src=(URL.createObjectURL(event.target.files[0]))
  source=image.src
}

let productsDataBase;
if (localStorage.length == 0) {
  productsDataBase = [];
} else {
  productsDataBase = JSON.parse(localStorage.product);
}

function createProducts() {
  let newPro = {
    title: `${title.value}`,
    price: `${price.value}`,
    taxes: `${taxes.value}`,
    ads: `${ads.value}`,
    discount: `${discount.value}`,
    total: `${total.innerHTML}`,
    count: `${count.value}`,
    category: `${category.value}`,
    imageSrc: `${source}`
  };
  if (newPro.count >= 2) {
    for (let i = 0; i < newPro.count; i++) {
      productsDataBase.push(newPro);
    }
  } else {
    productsDataBase.push(newPro);
  }
  localStorage.setItem("product", JSON.stringify(productsDataBase));

  showProducts();
  emptyInputs();
}
function emptyInputs() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  image.src="";
  total.style.backgroundColor = "red";
  searchBy.value = "";
  searchBy.placeholder = "chose a type to search";
  searchBy.setAttribute("disabled","disabled");
  
}
function showProducts() {
  if (productsDataBase.length == 0) {
    tbody.innerHTML = "";
    deleteAllBtn.classList.add("hidden");
  } else {
    tbody.innerHTML = "";
    Array.from(productsDataBase).forEach((e, i) => {
      tbody.innerHTML += `<tr>
    <td>${i + 1}</td>
    <td>${e.title}</td>
    <td>${e.price}</td>
    <td>${e.ads}</td>
    <td>${e.taxes}</td>
    <td>${e.discount}</td>
    <td>${e.total}</td>
    <td>${e.category}</td>
    <td><img src=${e.imageSrc} width=40px ></td>
    <td><button onclick="updateElement(${i})">update</button></td>
    <td><button onclick="deleteElement(${i})">delete</button></td>
    </tr>`;

    });
    
    deleteAllBtn.classList.remove("hidden");
    deleteAllBtn.innerHTML = `Delete All ( ${productsDataBase.length} )`;
  }
}
showProducts();
function deleteAll() {
  localStorage.clear();
  productsDataBase = [];
  showProducts();
}
function updateElement(index) {
  title.value = productsDataBase[index].title;
  price.value = productsDataBase[index].price;
  ads.value = productsDataBase[index].ads;
  taxes.value = productsDataBase[index].taxes;
  discount.value = productsDataBase[index].discount;
  category.value = productsDataBase[index].category;
  total.innerHTML = productsDataBase[index].total;
  count.classList.add("hidden");
  createBtn.classList.add("hidden");
  updateBtn.classList.remove("hidden");
  total.style.backgroundColor = "green";
  scrollTo(top);
  updateBtn.onclick = function () {
    productsDataBase[index] = {
      title: `${title.value}`,
      price: `${price.value}`,
      taxes: `${taxes.value}`,
      ads: `${ads.value}`,
      discount: `${discount.value}`,
      total: `${total.innerHTML}`,
      count: `${count.value}`,
      category: `${category.value}`,
      imageSrc: `${source}`

    };
    localStorage.setItem("product", JSON.stringify(productsDataBase));
    count.classList.remove("hidden");
    createBtn.classList.remove("hidden");
    updateBtn.classList.add("hidden");
    emptyInputs();
    showProducts();


  
  };
}
function searchByBtnClick(button) {
  searchBy.placeholder = button.innerText;
  searchBy.removeAttribute("disabled");
  searchBy.value = "";
  searchBy.focus();
}

function searching() {
  tbody.innerHTML=""
  if (searchBy.placeholder == "Search By title") {
    productsDataBase.forEach((e, i) => {
      if (e.title.includes(searchBy.value)) {
        tbody.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${e.title}</td>
      <td>${e.price}</td>
      <td>${e.ads}</td>
      <td>${e.taxes}</td>
      <td>${e.discount}</td>
      <td>${e.total}</td>
      <td>${e.category}</td>
      <td><img src=${e.imageSrc} width=40px ></td>
      <td><button onclick="updateElement(${i})">update</button></td>
      <td><button onclick="deleteElement(${i})">delete</button></td>
      </tr>`;
      }
    });
  } else {
    productsDataBase.forEach((e, i) => {
      if (e.category.includes(searchBy.value)) {
      tbody.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${e.title}</td>
      <td>${e.price}</td>
      <td>${e.ads}</td>
      <td>${e.taxes}</td>
      <td>${e.discount}</td>
      <td>${e.total}</td>
      <td>${e.category}</td>
      <td><img src=${e.imageSrc} width=40px ></td>
      <td><button onclick="updateElement(${i})">update</button></td>
      <td><button onclick="deleteElement(${i})">delete</button></td>
      </tr>`;
      }
    });
  }
}

function deleteElement(index) {
  productsDataBase.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productsDataBase));
  showProducts();
}
