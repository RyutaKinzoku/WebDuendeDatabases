const { Schema, model } = require('mongoose');

const esquemaProducto = new Schema({
    id: {type: Number},
    nombre: {type: String},
    descripcion: {type: String},
    precio: {type: Number},
    imagen: {type: String},
    cantidad: {type: Number}
})

const esquemaOrden = new Schema({
    id: {type: Number},
    correoUsuario: {type: String},
    comprobante:{type: String},
    direccion: {type: String},
    productos: {type: [esquemaProducto]}
})

const esquemaPublicacion = new Schema({
    id: {type: Number},
    imagen: {type: String},
    descripcion: {type: String},
    tags: {type:[String]},
    idCategoria: {type: Number},
    idSubcategoria: {type: Number},
})

const Producto = model('Producto', esquemaProducto)
const Orden = model('Orden', esquemaOrden)
const Publicacion = model('Publicacion', esquemaPublicacion)
module.exports = {Producto, Orden, Publicacion}