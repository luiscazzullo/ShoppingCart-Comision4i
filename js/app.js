//Variables
const shoppingCart = document.querySelector('#carrito');
const addButton = document.querySelector('#lista-cursos');
const shoppingCartList = document.querySelector('#lista-carrito tbody');
const deleteButton = document.querySelector('#vaciar-carrito');

eventListeners();
function eventListeners() {
  addButton.addEventListener('click', addProductToShoppingCart);
  document.addEventListener('DOMContentLoaded', renderElementsFromLS);
  //Remover un producto individualmente
  shoppingCart.addEventListener('click', removeProductFromDOM)
  //Vaciar el carrito
  deleteButton.addEventListener('click', removeAllProducts)
}

function addProductToShoppingCart(e) {
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')) {
    const productInfo = e.target.parentElement.parentElement;
    readProductInfo(productInfo);
  }
}

//Leer los datos del curso
function readProductInfo(productInfo) {
  productInfo = {
    image: productInfo.querySelector('img').src,
    title: productInfo.querySelector('h4').textContent,
    price: productInfo.querySelector('.precio span').textContent,
    id: productInfo.querySelector('a').getAttribute('data-id')
  }
  //Mostrar el producto en carrito
  showProductsOnShoppingCart(productInfo);
}

function showProductsOnShoppingCart(product) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${product.image}" />
    </td>
    <td>
      ${product.title}
    </td>
    <td>
      ${product.price}
    </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${product.id}">
        X
      </a>
    </td>
  `
  shoppingCartList.appendChild(row);
  saveProductLS(product);
}

function saveProductLS(element) {
  let products;
  products = getProductsFromLS();
  products.push(element);
  localStorage.setItem('products', JSON.stringify(products));
}

function getProductsFromLS() {
  let products;
  if(localStorage.getItem('products') === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem('products'));
  }
  return products;
}

function renderElementsFromLS() {
  let productsLS = getProductsFromLS();
  productsLS.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src="${product.image}" />
    </td>
    <td>
      ${product.title}
    </td>
    <td>
      ${product.price}
    </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${product.id}">
        X
      </a>
    </td>
  `
    shoppingCartList.appendChild(row);
  })
}

function removeProductFromDOM(e) {
  e.preventDefault();
  let removedProduct;
  let productId;
  if (e.target.classList.contains('borrar-curso')) {
    //Traversing DOM
    e.target.parentElement.parentElement.remove();
    removedProduct = e.target.parentElement.parentElement;
    productId = removedProduct.querySelector('a').getAttribute('data-id');
  }
  deleteProductLS(productId)
}

function deleteProductLS(removedElement) {
  let productsLS = getProductsFromLS();
  productsLS.forEach((product, index) => {
    if(product.id === removedElement) {
      productsLS.splice(index, 1)
    }
  })
  localStorage.setItem('products', JSON.stringify(productsLS));
}

//Borrar elemento del DOM
function removeAllProducts() {
  //Usamos un while para recorrer todos los hijos y quitar el elemento que seleccionemos
  while (shoppingCartList.firstChild) {
    shoppingCartList.removeChild(shoppingCartList.firstChild);
  }
  removeAllProductsFromLS();
  return false;
}
//Borrar todos los elementos
function removeAllProductsFromLS() {
  localStorage.clear();
}