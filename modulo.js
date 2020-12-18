var carritoModulo = (function () {
    let carrito = []
    const IVA = 1.21
    let tbody = document.getElementById("tbody")

    function calcularIva(precio) {
        var valor = precio * IVA
        return valor
    }

    function calcularTotalCompra() {
        var total = 0
        carrito.forEach(function (producto) {
            total += producto.precioconiva
        })

        return total
    }

    function persistirCarrito() {
        var carritoString = JSON.stringify(carrito)
        localStorage.setItem('carrito', carritoString)
    }

    function cargarCarritoAbandonado() {
        if (!localStorage.getItem("carrito")) {
            return false
        }
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }

    return {
        addItem: function (item) {
            //item {}
            item.precioconiva = calcularIva(item.precio)
            carrito.push(item)
            this.mostrarProductos()
            persistirCarrito()
        },
        cargarCarritoAnterior: function () {
            cargarCarritoAbandonado()
            this.mostrarProductos()
        },
        getValor: function () {
            return calcularIva(100)
        },
        eliminarProducto: function(nombre_producto){
            const result = carrito.filter(producto => producto.nombre_producto === nombre_producto);
            console.log(result)
        },
        mostrarProductos: function () {
            tbody.innerHTML = ""
            var fila = ""
            carrito.forEach(function (producto) {
                fila += `<tr>
                        <td>${producto.nombre_producto}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.precioconiva}</td>
                        <td><button id="${producto.nombre_producto}" class='btn btn-danger' id='btn_eliminar'>Eliminar</button></td>
                    </tr>
                    `
            })
            tbody.innerHTML = fila
            if (carrito.length > 0) {
                tbody.innerHTML +=
                    `
                <tr>
                    <td><strong>TOTAL:</strong></td>
                    <td></td>
                    <td>${calcularTotalCompra()}</td>
                    <td></td>
                </tr>
            `
            }
        }
    }

})()


document.querySelector("#btn_aceptar").addEventListener("click", () => {
    if (document.getElementById("producto").value.trim() === '' || document.getElementById("precio").value === '' || document.getElementById("precio").value < 0) {
        return false
    }
    const producto = {
        nombre_producto: document.getElementById("producto").value,
        precio: document.getElementById("precio").value
    }

    carritoModulo.addItem(producto)
    document.getElementById("producto").value = ''
    document.getElementById("precio").value = ''
})

document.addEventListener('DOMContentLoaded',function(){
    carritoModulo.cargarCarritoAnterior()

    var botones = document.querySelectorAll(".btn-danger")
    botones.forEach(function(boton){
        boton.addEventListener('click',function(){
            carritoModulo.eliminarProducto(boton.getAttribute("id"))
        })
    })

})



/*var productoEjemplo = {

    nombre_producto: "Esponja Mortimer",
    precio: 50
}
var productoEjemplo2 = {
    nombre_producto: "Fideos Don Vicente",
    precio: 200
}

carritoModulo.addItem(productoEjemplo)
carritoModulo.addItem(productoEjemplo2) */

//var modulo = carritoModulo.getValor()


/*

class Persona {
    private $nombre;
    private $apellido;
    private $edad;

}

$p1 = new Persona();
$p1->nombre

*/



var estudiantes = [
    { nombre: "Amalia", apellido: "Perez", materia: "PHP" },
    { nombre: "Ramon", apellido: "Valez", materia: "JS" },
    { nombre: "Andrea", apellido: "Ramirez", materia: "Python" }
]

// localstorage.setItem(string => clave, string => valor)

var estudiantesString = JSON.stringify(estudiantes)
//localStorage.setItem('estudiantes',estudiantesString)

//var estudiantesLocal = JSON.parse(localStorage.getItem("estudiantes"))