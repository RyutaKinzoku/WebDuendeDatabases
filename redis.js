const express = require('express');
const router = express.Router();
const redis = require("redis");
const mysql = require('./mysql.js');

const db = redis.createClient ({
    port : '30203',
    host : 'gusc1-present-bear-30203.upstash.io',
    password: 'e69b9301e5754f3fa3e98e6c7a22a3a2'
});

db.on('error', function (err) {
    console.log('No se pudo conectar con Redis' + err);
});
db.on('connect', function (err) {
    
});


router.post("/agregarProductoCarrito", (req, res)=>{
    const cantidad = req.body.cantidad;
    const idProducto = req.body.idProducto;
    const correo = req.body.correo;
    if (db.hexists(correo+'', idProducto+'') === true){
      db.hmset(correo+'',idProducto+'',cantidad+'');
      res.send(true);
    } else {
      res.send(false);
    }
});

router.post("/eliminarProductoCarrito", (req,res) => {
    const idProducto = req.body.idProducto;
    const correo = req.body.correo;
    if (db.hexists(correo+'', idProducto+'') === true){
      db.hdel(correo+'',idProducto+'');
      res.send(true);
    } else{
      res.send(false);
    }
})

router.post("/eliminarCarrito", (req, res) =>{
    const correo = req.body.correo;
    db.del(correo+'');
    res.send(true);
})
router.post("/obtenerCarrito", (req,res) =>{
    db.hmget(req);
})

router.get("/obtenerProductosCarrito", (req,res) => {
  let correo = req.query.correo;
  var getPares = function( callback ) { 
    var pares = [];           
    db.hkeys(correo + '', function (_error, value) {
      if (value.length !== 0){
        for (let index = 0; index < value.length; index++) {
          db.hmget(correo + '', value[index] + '', function (_error, cantidad, ) {
            let par = [value[index], cantidad.pop()];
            pares.push(par);
            if (index === value.length-1){
              callback(pares)
            }
          });
        };
      } else {
        callback(value);
      }
    });
  };
  function savePares(pares){
    res.send(pares);
  }
  getPares(savePares);
})

module.exports = router;