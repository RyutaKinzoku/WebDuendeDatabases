const express = require('express')
const router = express.Router();
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const { query, request} = require('express')

const db = mysql.createPool({
    host : "remotemysql.com",
    user : "EwecdhGRNt",
    password : "QD86330FgN",  
    port: 3306,
    database: "EwecdhGRNt"
});

router.use(cors());
router.use(express.json())
router.use(bodyParser.urlencoded({extended: true}));

//Usuario
router.get('/obtenerUsuario', (req,res) => {
    const sqlSelect = "SELECT * FROM Usuario WHERE correo = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.correo], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.post("/agregarUsuario", (req,res) =>{
    const correo = req.body.correo 
    const nombre = req.body.nombre 
    const primerApellido = req.body.primerApellido 
    const segundoApellido = req.body.segundoApellido 
    const telefono = req.body.telefono 
    const cedula = req.body.cedula 
    const contrasena = req.body.contrasena 
    const rol = req.body.rol

    const sqlInsert = "INSERT INTO Usuario (correo, nombre, primerApellido, segundoApellido, telefono, cedula, contrasena, rol) VALUES (?,?,?,?,?,?,?,?);";
    db.query(sqlInsert , [correo, nombre, primerApellido, segundoApellido, telefono, cedula, contrasena, rol] ,(err, result) => {
        console.log(err);
        res.send(err);
    })
});

//Compromisos
router.get('/getCursos', (_,res) => {
    const sqlSelectCursos = "SELECT * FROM Curso;"
    db.query(sqlSelectCursos, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

router.get('/getCitas', (_,res) => {
    const sqlSelectCitas = "SELECT * FROM Cita;"
    db.query(sqlSelectCitas, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

router.get('/getEntregas', (_,res) => {
    const sqlSelectEntregas = "SELECT * FROM Entrega;"
    db.query(sqlSelectEntregas, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

router.get('/obtenerCurso', (req,res) => {
    const sqlSelect = "SELECT * FROM Curso WHERE ID = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.idCompromiso], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.post('/eliminarCurso', (req,res) => {
    const sqlDeleteCurso = "DELETE FROM `Curso` WHERE ID=?;"
    const sqlDeleteCompromiso = "DELETE FROM `Compromiso` WHERE ID=?;"
    db.query(sqlDeleteCurso, [req.body.idCompromiso], () => {
        db.query(sqlDeleteCompromiso, [req.body.idCompromiso], (err, _) => {
            console.log(err);
            res.send(err);
        })
    })
})

router.get('/obtenerCita', (req,res) => {
    const sqlSelect = "SELECT * FROM Cita WHERE ID = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.idCompromiso], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.post('/eliminarCita', (req,res) => {
    const sqlDeleteCita = "DELETE FROM `Cita` WHERE ID=?;"
    const sqlDeleteServicioIndividual = "DELETE FROM `ServicioIndividual` WHERE ID=?;"
    const sqlDeleteCompromiso = "DELETE FROM `Compromiso` WHERE ID=?;"
    db.query(sqlDeleteCita, [req.body.idCompromiso], () => {
        db.query(sqlDeleteServicioIndividual, [req.body.idCompromiso], () => {
            db.query(sqlDeleteCompromiso, [req.body.idCompromiso], (err, _) => {
                console.log(err);
                res.send(err);
            })
        })
    })
})

router.get('/obtenerEntrega', (req,res) => {
    const sqlSelect = "SELECT * FROM Entrega WHERE ID = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.idCompromiso], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.post('/eliminarEntrega', (req,res) => {
    const sqlDeleteEntrega = "DELETE FROM `Entrega` WHERE ID=?;"
    const sqlDeleteServicioIndividual = "DELETE FROM `ServicioIndividual` WHERE ID=?;"
    const sqlDeleteCompromiso = "DELETE FROM `Compromiso` WHERE ID=?;"
    db.query(sqlDeleteEntrega, [req.body.idCompromiso], () => {
        db.query(sqlDeleteServicioIndividual, [req.body.idCompromiso], () => {
            db.query(sqlDeleteCompromiso, [req.body.idCompromiso], (err, _) => {
                console.log(err);
                res.send(err);
            })
        })
    })
})

//Curso
router.post("/agregarCurso", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const titulo = req.body.titulo
    const lugar = req.body.lugar

    const sqlInsertCompromiso = "INSERT INTO Compromiso (fechaHoraInicio, fechaHoraFin, ID, lugar) VALUES (?,?,?,?);";
    const sqlInsertCurso = "INSERT INTO Curso (fechaHoraInicio, fechaHoraFin, ID, lugar, titulo) VALUES (?,?,?,?,?);"

    db.query(sqlInsertCompromiso, [fechaHoraInicio, fechaHoraFin, id, lugar], () => {
        db.query(sqlInsertCurso , [fechaHoraInicio, fechaHoraFin, id, lugar, titulo] ,(err) => {
            console.log(err);
            res.send(err);
        })
    })
});

router.post("/modificarCurso", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const titulo = req.body.titulo
    const lugar = req.body.lugar

    const sqlUpdateCompromiso = "UPDATE `Compromiso` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=? WHERE `ID`=?";
    const sqlUpdateCurso = "UPDATE `Curso` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=?,`titulo`=? WHERE `ID`=?"

    db.query(sqlUpdateCompromiso, [fechaHoraInicio, fechaHoraFin, lugar, id], () => {
        db.query(sqlUpdateCurso , [fechaHoraInicio, fechaHoraFin, lugar, titulo, id] ,(err) => {
            console.log(err);
            res.send(err);
        })
    })
});

//Entrega
router.post("/agregarEntrega", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const lugar = req.body.lugar
    const correoUsuario = req.body.correoUsuario
    const idOrdenCompra = req.body.idOrdenCompra

    const sqlInsertCompromiso = "INSERT INTO Compromiso (fechaHoraInicio, fechaHoraFin, ID, lugar) VALUES (?,?,?,?);";
    const sqlInsertServicioIndividual = "INSERT INTO ServicioIndividual (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario) VALUES (?,?,?,?,?);";
    const sqlInsertEntrega = "INSERT INTO Entrega (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario, idOrdenCompra) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsertCompromiso, [fechaHoraInicio, fechaHoraFin, id, lugar], () => {
        db.query(sqlInsertServicioIndividual, [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario], () => {
            db.query(sqlInsertEntrega , [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario, idOrdenCompra] ,(err) => {
                console.log(err);
                res.send(err);
            })
        })
    })
});

router.post("/modificarEntrega", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const correoUsuario = req.body.correoUsuario
    const idOrdenCompra = req.body.idOrdenCompra
    const lugar = req.body.lugar

    const sqlUpdateCompromiso = "UPDATE `Compromiso` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=? WHERE `ID`=?";
    const sqlUpdateServicioIndividual = "UPDATE `ServicioIndividual` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=?,`correoUsuario`=? WHERE `ID`=?";
    const sqlUpdateEntrega = "UPDATE `Entrega` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=?,`correoUsuario`=?,`idOrdenCompra`=? WHERE `ID`=?"

    db.query(sqlUpdateCompromiso, [fechaHoraInicio, fechaHoraFin, lugar, id], () => {
        db.query(sqlUpdateServicioIndividual , [fechaHoraInicio, fechaHoraFin, lugar, correoUsuario, id] ,() => {
            db.query(sqlUpdateEntrega , [fechaHoraInicio, fechaHoraFin, lugar, correoUsuario, idOrdenCompra, id] ,(err) => {
                console.log(err);
                res.send(err);
            })
        })
    })
});

//Cita
router.post("/agregarCita", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const lugar = req.body.lugar
    const correoUsuario = req.body.correoUsuario
    const idPublicacion = req.body.idPublicacion

    const sqlInsertCompromiso = "INSERT INTO Compromiso (fechaHoraInicio, fechaHoraFin, ID, lugar) VALUES (?,?,?,?);";
    const sqlInsertServicioIndividual = "INSERT INTO ServicioIndividual (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario) VALUES (?,?,?,?,?);";
    const sqlInsertCita = "INSERT INTO Cita (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario, idPublicacion) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsertCompromiso, [fechaHoraInicio, fechaHoraFin, id, lugar], () => {
        db.query(sqlInsertServicioIndividual, [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario], () => {
            db.query(sqlInsertCita , [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario, idPublicacion] ,(err) => {
                console.log(err);
                res.send(err);
            })
        })
    })
});

router.post("/modificarCita", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const correoUsuario = req.body.correoUsuario
    const idPublicacion = req.body.idPublicacion
    const lugar = req.body.lugar

    const sqlUpdateCompromiso = "UPDATE `Compromiso` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=? WHERE `ID`=?";
    const sqlUpdateServicioIndividual = "UPDATE `ServicioIndividual` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=?,`correoUsuario`=? WHERE `ID`=?";
    const sqlUpdateCita = "UPDATE `Cita` SET `fechaHoraInicio`=?,`fechaHoraFin`=?,`lugar`=?,`correoUsuario`=?,`idPublicacion`=? WHERE `ID`=?"

    db.query(sqlUpdateCompromiso, [fechaHoraInicio, fechaHoraFin, lugar, id], () => {
        db.query(sqlUpdateServicioIndividual , [fechaHoraInicio, fechaHoraFin, lugar, correoUsuario, id] ,() => {
            db.query(sqlUpdateCita , [fechaHoraInicio, fechaHoraFin, lugar, correoUsuario, idPublicacion, id] ,(err) => {
                console.log(err);
                res.send(err);
            })
        })
    })
});

//Categorias
router.get('/getCategorias', (_,res) => {
    const sqlSelectCategorias = "SELECT * FROM Categoria;"
    db.query(sqlSelectCategorias, (_, result) => {
        console.log(result);
        res.send(result);
    });
});

router.post('/eliminarCategoria', (req,res)=> {
    const sqlDeleteCategoria = "DELETE FROM Categoria WHERE ID=?;"
    db.query(sqlDeleteCategoria, [req.body.idCategoria], (err, _) => {
        console.log(err);
        res.send(err);
    })
})

//Obtener ID

router.get("/getIdProducto", (_, res) => {
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'producto'"
    db.query(sqlSelect, (_, result) => {
    console.log(result);
    res.send(result)
    })
})

router.post("/setIdProducto", (_, res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor = ultimo_valor+1 WHERE nombre = 'producto'"
    db.query(sqlUpdate, (err, _) => {
        if(err){
            console.log(err);
            res.send(err);
        }
    })
})

router.get("/getIdPublicacion", (_, res) => {
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'publicacion'"
    db.query(sqlSelect, (_, result) => {
    console.log(result);
    res.send(result)
    })
})

router.post("/setIdPublicacion", (_, res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor = ultimo_valor+1 WHERE nombre = 'publicacion'"
    db.query(sqlUpdate, (err, _) => {
        if(err){
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/getNextOrden', (req,res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor=ultimo_valor+1 WHERE nombre='orden'"
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'orden';"
    db.query(sqlUpdate, () => {
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        })
    })
})

router.get("/getIdOrden", (_, res) => {
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'orden'"
    db.query(sqlSelect, (_, result) => {
    console.log(result);
    res.send(result)
    })
})

router.post("/setIdORden", (_, res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor = ultimo_valor+1 WHERE nombre = 'orden'"
    db.query(sqlUpdate, (err, _) => {
        if(err){
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/getNextCompromisos', (req,res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor=ultimo_valor+1 WHERE nombre='compromiso'"
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'compromiso';"
    db.query(sqlUpdate, () => {
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        })
    })
})

//Notificaciones

router.post("/modificarNotificacionCompra", (req,res) =>{});
router.post("/modificarNotificacionCita", (req,res) =>{});

router.post('/eliminarNotificacionCita', (req,res) => {
    const sqlDeleteNotificacionCita = "DELETE FROM `NotificacionCita` WHERE ID=?;"
    const sqlDeleteNotificacion = "DELETE FROM `Notificacion` WHERE ID=?;"
    db.query(sqlDeleteNotificacionCita, [req.body.idNotificacion], () => {
        db.query(sqlDeleteNotificacion, [req.body.idNotificacion], (err, _) => {
            console.log(err);
            res.send(err);
        })
    })
})

router.post('/eliminarNotificacionCompra', (req,res) => {
    const sqlDeleteNotificacionCompra = "UPDATE `NotificacionCompra` SET `vista`=? WHERE ID=?;"
    const sqlDeleteNotificacion = "UPDATE `Notificacion` SET `vista`=? WHERE ID=?;"
    db.query(sqlDeleteNotificacionCompra, [false,req.body.idNotificacion], ()  => {
        db.query(sqlDeleteNotificacion, [false,req.body.idNotificacion], (err, _) => {
            console.log(err);
            res.send(err);
        })
    })
})

router.post('/eliminarNotificacionDesdeOrden', (req,res) => {
    const sqlDeleteNotificacionCompra = "UPDATE `NotificacionCompra` SET `vista`=? WHERE idOrdenCompra=?;"
    const sqlIDNotificacion = "SELECT ID WHERE idOrdenCompra=?"
    const sqlDeleteNotificacion = "UPDATE `Notificacion` SET `vista`=? WHERE ID=?;"
    db.query(sqlDeleteNotificacionCompra, [false,req.body.idOrdenCompra], ()  => {
        db.query(sqlIDNotificacion, [req.body.idOrdenCompra], (_,res) => {
            db.query(sqlDeleteNotificacion, [false,res], (err, _) => {
                console.log(err);
                res.send(err);
            })
        })
    })
})

router.get('/obtenerNotificacionCita', (req,res) => {
    const sqlSelect = "SELECT * FROM NotificacionCita WHERE ID = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.idNotificacion], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.get('/obtenerNotificacionCompra', (req,res) => {
    const sqlSelect = "SELECT * FROM NotificacionCompra WHERE ID = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.idNotificacion], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.post("/agregarNotificacionCompra", (req,res) =>{
    const id = req.body.id
    const idOrdenCompra = req.body.idOrdenCompra

    const sqlInsertNotificacion = "INSERT INTO Notificacion (ID,vista) VALUES (?,?);";
    const sqlInsertNotificacionCompra = "INSERT INTO NotificacionCompra (ID, idOrdenCompra,vista) VALUES (?,?,?);"

    db.query(sqlInsertNotificacion, [id,true], () => {
        db.query(sqlInsertNotificacionCompra , [id, idOrdenCompra, true] ,(err) => {
            console.log(err);
            res.send(err);
        })
    })
});

router.post("/agregarNotificacionCita", (req,res) =>{
    const id = req.body.id
    const mensaje = req.body.mensaje;
    const idPublicacion = req.body.idPublicacion;
    const correoUsuario = req.body.correoUsuario;

    const sqlInsertNotificacion = "INSERT INTO Notificacion (ID) VALUES (?);";
    const sqlInsertNotificacionCompra = "INSERT INTO NotificacionCita (ID, mensaje, idPublicacion, correoUsuario) VALUES (?,?,?,?);"

    db.query(sqlInsertNotificacion, [id], () => {
        db.query(sqlInsertNotificacionCompra , [id, mensaje, idPublicacion,correoUsuario] ,(err) => {
            console.log(err);
            res.send(err);
        })
    })
});

router.get('/getNotificacionesCita', (_,res) => {
    const sqlSelectNotificacionesCita = "SELECT * FROM NotificacionCita;"
    db.query(sqlSelectNotificacionesCita, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

router.get('/getNotificacionesCompra', (_,res) => {
    const sqlSelectNotificacionesCompra= "SELECT * FROM NotificacionCompra;"
    db.query(sqlSelectNotificacionesCompra, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

router.get('/getNextNotificaciones', (req,res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor=ultimo_valor+1 WHERE nombre='notificacion';"
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'notificacion';"
    db.query(sqlUpdate, () => {
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        })
    })
})

router.post("/agregarCategoria", (req,res) =>{
    const idCategoria = req.body.idCategoria
    const nombre = req.body.nombre
    const sqlInsertCategoria = "INSERT INTO Categoria (ID, nombre) VALUES (?,?)";
    db.query(sqlInsertCategoria , [idCategoria, nombre] ,(err) => {
        console.log(err);
        res.send(err);
    })
});

router.get('/getNextCategorias', (req,res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor=ultimo_valor+1 WHERE nombre='categoria';"
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'categoria';"
    db.query(sqlUpdate, () => {
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        })
    })
})

router.post("/modificarCategoria", (req,res) =>{
    const idCategoria = req.body.idCategoria
    const nombre = req.body.nombre;
    const sqlUpdateCategoria = "UPDATE `Categoria` SET `nombre`=? WHERE `ID`=?";
    db.query(sqlUpdateCategoria , [nombre, idCategoria] ,(err) => {
        console.log(err);
        res.send(err);
    })
});

router.get('/obtenerCategoria', (req,res) => {
    const sqlSelect = "SELECT * FROM Categoria WHERE ID = ?;"
    db.query(sqlSelect, [req.query.idCategoria], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

//Subcategorias
router.get('/getSubcategorias', (req,res) => {
    const sqlSelect = "SELECT * FROM Subcategoria WHERE idCategoria = ?;"
    db.query(sqlSelect, [req.query.idCategoria], (err, result) => {
        console.log(result);
        res.send(result);
    })
});

router.get('/obtenerSubcategoria', (req,res) => {
    const sqlSelect = "SELECT * FROM Subcategoria WHERE ID = ?;"
    db.query(sqlSelect, [req.query.idSubcategoria], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.post("/modificarSubcategoria", (req,res) =>{
    const idSubcategoria = req.body.idSubcategoria
    const nombre = req.body.nombre;
    const sqlUpdateSubcategoria = "UPDATE `Subcategoria` SET `nombre`=? WHERE `ID`=?";
    db.query(sqlUpdateSubcategoria , [nombre, idSubcategoria] ,(err) => {
        console.log(err);
        res.send(err);
    })
});

router.post("/agregarSubcategoria", (req,res) =>{
    const idSubcategoria = req.body.idSubcategoria
    const nombre = req.body.nombre
    const idCategoria = req.body.idCategoria;
    console.log(idSubcategoria, nombre, idCategoria);
    const sqlInsertSubcategoria = "INSERT INTO Subcategoria (ID, nombre, idCategoria) VALUES (?,?,?)";
    db.query(sqlInsertSubcategoria , [idSubcategoria, nombre, idCategoria] ,(err) => {
        console.log(err);
        res.send(err);
    })
});

router.get('/getNextSubcategorias', (req,res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor=ultimo_valor+1 WHERE nombre='subcategoria';"
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'subcategoria';"
    db.query(sqlUpdate, () => {
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        })
    })
})

router.post('/eliminarSubcategoria', (req,res)=> {
    const sqlDeleteSubcategoria = "DELETE FROM Subcategoria WHERE ID=?;"
    db.query(sqlDeleteSubcategoria, [req.body.idSubcategoria], (err, _) => {
        console.log(err);
        res.send(err);
    })
})

module.exports = router;