let carro2 = document.querySelector('.carrito2');
let vacio = document.getElementById('vaciar');
let totalprecio = document.getElementById('cuenta');
baseDeDatosLs(productos);

function borrarCarrito(){
    vaciar.innerHTML += `<button class="btn btn-dark e">VACIAR CARRITO</button>`
    document.getElementById('vaciar').addEventListener('click', () => {localStorage.removeItem("carrito")
    vaciarCarrito();
    calculoVacio();})
}

function calculoTotal(){
    cuenta.innerHTML += `<table class="table"><tr><td>TOTAL A ABONAR : </td>
    </tr>
    <tr>
    <td class="noBorde"> $${totalAcumulado()}</td>
    </tr></table> ` ;
}

function productosSeleccionados(productos) {
    carrito.forEach((prod) => {
        let {img: imagen, precio, id , nombre , cantidad } = prod;
        carro2.innerHTML += `
                   <table class="table">
                   <tr>
                   <td class="noBorde">IMAGEN</td>
                   <td class="noBorde">PRODUCTO</td>
                   <td class="noBorde">CANTIDAD</td>
                   <td class="noBorde">PRECIO</td>
                   </tr>
                   <tr>
                   <td><img src="${"." + imagen}" alt="${nombre}" class="img-thumbnail"  width="75"></td>
                   <td>${nombre}</td>
                   <td>${cantidad}</td>
                   <td>$${precio}</td>
                   <td><button id="borra" class="btn btn-dark e ${id}">Borrar</button></td>
                   </tr>
                    <table>
                   `
    })
}

function totalAcumulado(productosSeleccionados){
    return carrito.reduce((acc,ite)=> acc + ite.precio * ite.cantidad, 0)
}

function vaciarCarrito(){
    carrito === []
    ? (carro2.innerHTML = productosSeleccionados(productos))
    : (carro2.innerHTML = `<div class="alert alert-warning" role="alert">CARRITO VACIO , RECUERDA AGREGAR PRODUCTOS</div>`) ;
}

function calculoVacio(){
    carrito === []
    ? (cuenta.innerHTML = totalAcumulado(productosSeleccionados()))
    : (cuenta.innerHTML = ``);
}

function Finalizado(){
    let final = document.querySelector('.pagar');
    final.innerHTML += `<div><button class="btn btn-dark e>FINALIZAR COMPRA</button></div>` ;
    document.querySelector('.pagar').addEventListener('click', () => {})
}

productosSeleccionados(productos);
borrarCarrito();
calculoTotal();
Finalizado();