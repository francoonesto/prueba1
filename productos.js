const productos = [
    {id:1,nombre:"Conjunto",precio:8000,img:"./images/conjuntoazul.webp"},
    {id:2,nombre:"RemeronN",precio:4500,img:"./images/remeronnegro.webp"},
    {id:3,nombre:"RemeronB",precio:7600,img:"./images/remeronblanco.webp"},
    {id:4,nombre:"Short",precio:5000,img:"./images/shortdejean.webp"},
    {id:5,nombre:"Moonclaro",precio:12000,img:"./images/moonclar.webp"},
    {id:6,nombre:"Moonoscuro",precio:13000,img:"./images/moonoscur.webp"},
];

function baseDeDatosLs(productos) { localStorage.setItem("productos", JSON.stringify(productos));}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let main = document.querySelector('.mercaderia');
let carro = document.querySelector('.carrito');
let contador = document.querySelector('.numero');


function nuestrosProductos() {
    productos.forEach((prod) => {
        let {img: imagen, precio, id , nombre } = prod;
        main.innerHTML += `<div class="col-md-3">
                   <div class="card border-0">
                    <img src="${imagen}" alt="${nombre}" class="img-thumbnail" height="250" width="250">
                   <div class="card-body">
                     <p class="card-text text-start">${nombre}</p>
                       <p class="text-start">$${precio}</p>
                    <p class="text-start"><button id="book-${id}" class="btn btn-dark">Agregar</button>
                   </div>
                   </div>
                   </div>`
    })
botones();
}

function botones(){
    productos.forEach((prod) => {
        document.getElementById(`book-${prod.id}`).addEventListener('click', () => {
          agregarAlCarrito(prod);
        });
      });
}

function agregarAlCarrito(prod) {
    let existe = carrito.some((element) => element.id == prod.id);

    if (existe === false) {
      let aux = {
        ...prod
      };
      aux.cantidad = 1;
      carrito.push(aux);
    } else {
      let miProd = carrito.find((element) => element.id == prod.id);
      miProd.cantidad++;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    itemPlus();
  }

  function mostrarCarrito() {
    carrito.length === 0
      ? (carro.innerHTML = `<span>0</span>`)
      : (carro.innerHTML = '');
    carrito.forEach(({ precio, cantidad, id }) => {
      carro.innerHTML += `<div >
                                 <p>CANTIDAD: ${cantidad}</p>
                                </div>`;
    });
  }

    function itemPlus() {
    let totalCuenta = carrito.reduce((acc, ite) => acc + ite.cantidad, 0);
    totalCuenta === 0
      ? (contador.innerText = "0" )
      : (contador.innerText = totalCuenta);
  }

baseDeDatosLs(productos);
nuestrosProductos();
mostrarCarrito();
itemPlus();