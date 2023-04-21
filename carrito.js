let carro2 = document.querySelector('.carrito2');
let vacio = document.getElementById('vaciar');
let totalprecio = document.getElementById('cuenta');
let final = document.querySelector('.pagar');
let btnb = document.getElementById('borrar');
baseDeDatosLs(productos);

function borrarCarrito(){
    vaciar.innerHTML += `<button class="btn btn-dark e">VACIAR CARRITO</button>`
    document.getElementById('vaciar').addEventListener('click', () => {localStorage.removeItem("carrito")
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'EL CARRITO SE HA VACIADO CON EXITO',
        showConfirmButton: false,
        timer: 1000
      })
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
                   <td><button id="borrar" class="btn btn-dark e" onclick="prodEliminar(${id})">Borrar</button></td>
                   </tr>
                    <table>
                   `
    })
    borrarCarrito();

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

function finalizado(){
    final.innerHTML += `<button class="btn btn-dark e">FINALIZAR COMPRA</button>`
    document.querySelector('.pagar').addEventListener('click', () => {const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'PROCEDEMOS AL PAGO?',
        text: `El monto a abonar es : $${totalAcumulado()}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'PAGAR',
        cancelButtonText: 'CANCELAR',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'APROBADO',
            'GRACIAS POR SU COMPRA',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'CANCELADO',
            'PROCESO CANCELADO',
            'error'
          )
        }
      })})
    }

function prodEliminar(id){
const carrito = productosSeleccionados();
const productos = carrito.filter(item => item.id !== id)
return carrito.filter(item => item.id !== id)
}

productosSeleccionados();
calculoTotal();
finalizado();
prodEliminar();

