class FikaRemera{
    constructor(id, marca, talle, precio, imagen ){
        this.id = id
        this.marca = marca
        this.talle = talle
        this.precio = precio
        this.imagen = imagen
    }
}
// hago nullish y me ahorro codigo
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [] 

const remera1 = new FikaRemera (1, "adidas", "S", 1900,"../imagenes/remeras1.jpg")
const remera2 = new FikaRemera (2, "nike", "M", 1900, "../imagenes/remeras2.jpg")
const remera3 = new FikaRemera (3, "nike", "L", 2000, "../imagenes/remeras3.jpg")
const remera4 = new FikaRemera (4, "puma", "S", 2100, "../imagenes/remeras4.jpg")
const remera5 = new FikaRemera (5, "Gucci", "S", 1800, "../imagenes/remeras5.jpg")
const remera6 = new FikaRemera (6, "adidas", "S", 2000, "../imagenes/remera6.webp")
const remera7 = new FikaRemera (7, "balenciaga", "L", 2000,"../imagenes/remeras7.jpg")
const remera8 = new FikaRemera (8, "adidas", "S", 2000,"../imagenes/remeras8.jpg")
const remera9 = new FikaRemera (9, "nike", "M", 2100, "../imagenes/remeras9.jpg")
const remera10 = new FikaRemera (10, "puma", "S", 2300, "../imagenes/remeras10.jpg")

const remeras = [remera1, remera2, remera3, remera4, remera5, remera6, remera7, remera8, remera9, remera10]
// desestructuracion
let{marca, id, talle} = remera1
console.log(marca,id,talle)
let{precio} = remera7
console.log(precio)
const divVacio = document.getElementById("divVacio")

// Creo los productos mediante el innerHTML
fetch('../json/productos.json')
.then(respuesta => respuesta.json())
.then(productos => console.log(productos))
    remeras.forEach((remeras, indice) =>{
        divVacio.innerHTML += `
        <div class="card border-dark mb-3 col-md-4 mx-5 my-5" id="remeras${indice}" style="max-width: 20rem; ">
            <img src="${remeras.imagen}" class="card-img-top imagenRemeras" alt="..."> 
            <div class="card-header"><h2>${remeras.precio}</h2></div>
            <div class="card-body">
                <h4 class="card-title">${remeras.marca}</h4>
                <p class="card-title"> talle: ${remeras.talle}</p>
                <button class="btn btn-dark">Agregar al carrito</button>
            </div>
        </div>
        
        
        `

    })
    

const elementosCarrito = document.getElementById("elementosCarrito")
const divMostrarCarrito = document.getElementById("divMostrarCarrito").children[0]
const divVacio2 = document.getElementById("divMostrarCarrito").children[1]
const divVacio3 = document.getElementById("divMostrarCarrito").children[2]
let remeraCarrito, remeraAgregada
let total = 0

remeras.forEach((remera, indice) =>{
    let cardButton = document.getElementById(`remeras${indice}`).lastElementChild.children[2]
    cardButton.addEventListener('click', () => {
        remeraAgregada = {
            cantidad: 0,
            id: remera.id,
            marca: remera.marca,
            talle: remera.talle,
            precio: remera.precio,
            imagen: remera.imagen,
        }
        if(carrito.some(remeraCarrito => remeraCarrito.id === remeraAgregada.id)){
            remeraCarrito = carrito.find(remeraCarrito => remeraCarrito.id === remeraAgregada.id)
            remeraCarrito.cantidad += 1
        }else{
            remeraAgregada.cantidad += 1
            remeraCarrito = remeraAgregada
            carrito.push(remeraCarrito);
        }
        sumaTotal(remeraCarrito)
        console.log(carrito)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        Toastify({
            text: "Producto agregado al carrito",
            duration: 1000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, red, orange, yellow)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    })
    
})

function sumaTotal(carro){
    total += carro.precio
    return total
}

function restaTotal(carro){
    total -= (carro.precio * carro.cantidad)
        divVacio2.innerHTML = `
            <h4>$${total}</h4>
        `
}

// Hago aparecer los productos en el carrito
elementosCarrito.addEventListener("click", ()=> {
    divMostrarCarrito.innerHTML = ""
    carrito.forEach((carro, indice)=>{
        divMostrarCarrito.innerHTML += `
        <div class="card border-dark mb-3" id="carrito${indice}" style="max-width: 20rem; margin:4px; ">
            <img src="${carro.imagen}" class="card-img-top" alt="..."> 
            <div class="card-header">
                <h2>${carro.precio}</h2>
                <h6>cantidad: ${carro.cantidad}</h6>
            </div>
            <div class="card-body">
                    <h4 class="card-title">${carro.marca}</h4>
                    <p class="card-title"> talle: ${carro.talle}</p>
                    <button class="btn btn-danger">Eliminar del carrito</button>
            </div>
        </div>
        

        `
        divVacio2.innerHTML = `
            <h4>$${total}</h4>
        `
        divVacio3.innerHTML = `
            <button id="botonFinalizarCompra" class="btn btn-dark">Finalizar Compra</button>
            `
        const botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
        botonFinalizarCompra.addEventListener("click", ()=> {
            Swal.fire({
            icon: 'success',
            title: 'Excelente',
            text: 'Compra finalizada',
        })
    })
})

// Elimino los productos del carrito
    carrito.forEach((carro, indice)=>{
    let cardButtonEliminar = document.getElementById(`carrito${indice}`).lastElementChild.lastElementChild
        cardButtonEliminar.addEventListener('click', () => {
            document.getElementById(`carrito${indice}`).remove()
            carrito.splice(carrito.indexOf(carro), 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            restaTotal(carro)
        })
    })
})


























