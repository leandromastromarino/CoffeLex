console.log("Archivo enlazado")
let carrito = []

const VerCarrito = document.getElementById("ver-carrito")
const shop = document.getElementById("shop")

const consultabase = async () => {
    const resp = await fetch(`./assets/js/productos.json`)
    const productos = await resp.json()
    console.log("los productos del Json son: ", productos)
    CompletarProductos(productos)
    AgregarCarrito(productos)
}

function CompletarProductos(productos) {
    productos.forEach(producto => {
        let content = document.createElement("div")
        content.className += " col-md-4"; //agrega la clase col-md-4 al div creado arriba
        content.innerHTML =

            `
                <div class="card">
                        <div class="img">
                        <img class="product-img" src="${producto.img}" alt="">
                    </div>
                    <div class="product-title">${producto.nombre}</div>
                    <div class="product-sell">
                        <button class=" product-button" id="agregar${producto.id}">
                            <img class="cart-img" src="./assets/images/carrito-shop-black.png" alt="">
                        </button>
                        <div class="product-price">$${producto.precio}</div>
                    </div>
                </div>
            `

        shop.append(content) //agrega el content debajo del ID (shop)
/*         const boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener(`click`, () => {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.img
            })
            console.log(carrito)
            swal(`${producto.nombre} agregado al carrito`, {
                buttons: false,
                icon:"success",
                timer: 1000,
              });
        }) */
       
    });

}
consultabase() //ejecuta la funcionm para agregar todos los productos del archivo productos .json


//------------MOdal que muestra los productos en carrito----------------------------
VerCarrito.addEventListener(`click`, () => {//cuando se apreta boton de carrito ejecuta fauncion de actualizar carrito
    const carrito=document.getElementById("modal-product");
    carrito.innerHTML="";// bora el contenido del modal del carrito
    const modal = document.getElementById("modal-container");
    modal.style.setProperty("display", "flex");//agrego la clase para mostrar el modal del carrito
    const modal_close=document.getElementById("modal-close");
    modal_close.addEventListener("click",()=>{
        modal.style.setProperty("display","none");//clase para ocultar el modal
    })
    actualizarCarrito()
})

//-------borrar elementos de carrito---------------
function Borrarproducto(prodID) {
    const item=carrito.find((prod)=>prodID===prodID)
    let index=carrito.indexOf(item)
    carrito.splice(index,1)
    console.log("Producto borrado")
    const carritoborrar=document.getElementById("modal-product");
    carritoborrar.innerHTML=""// bora el contenido del modal del carrito
    actualizarCarrito()
}

//-------------Actualizar el carrito--------

function actualizarCarrito() {

    console.log("evento de carrito")
    let modalproduct=document.getElementById("modal-product")
    carrito.forEach((producto) => {
        let carritoProduct = document.createElement("div")
        carritoProduct.className = "modal-product"
        carritoProduct.innerHTML = `
        <img src="${producto.imagen}" class="modal-img">
        <h3>${producto.nombre}</h3>
        <h3>${producto.precio}</h3>
        <div class="modal-cantidad">
          <h3 class="suma-resta">-</h3>
          <h3>1</h3>
          <h3 class="suma-resta">+</h3>
        </div>
        <div class="trash" id="trash">
            <button onclick="Borrarproducto(${producto.id})">
            <img src="../assets/images/trash@4x.png" alt="borrar-producto" class="img-trash">
            </button>
          
        </div>
        `
        modalproduct.append(carritoProduct)

    })
    let total = carrito.reduce((acc, item) => {
        return acc = acc + item.precio
    }, 0);
    const modal_total=document.getElementById("modal-total")
    modal_total.innerHTML=""
    let div=document.createElement("div")
    div.innerHTML = `
    <h3>TOTAL ${total}</h3>`
    modal_total.append(div) 

    if (carrito.length!==0) {
        const carritoNumber = document.getElementById("carrito-number")
        carritoNumber.style.setProperty("display","flex")
        carritoNumber.innerHTML=`${carrito.length}`
        
    }
    console.log("cantidad de articulos en carrito es ",carrito.length)
    
}


function AgregarCarrito(productos) {
    productos.forEach(producto => {
        const boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener(`click`, () => {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.img
            })
            console.log(carrito)
            swal(`${producto.nombre} agregado al carrito`, {
                buttons: false,
                icon:"success",
                timer: 1000,
              });
            actualizarCarrito()//al agregar un producto al carrito, actualiza el carrito
        })
       
    });


}
