require('dotenv').config()

const express = require('express')
const helmet = require('helmet');

const { DBTest } = require('./dataBase.js');
const asadoModel = require('./asadoModel.js');

const app = express()
const PUERTO = process.env.PUERTO

// Configurar EJS como motor de plantilla
app.set('view engine', 'ejs');

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async function (req, res) {
    const asados = await asadoModel.findAll();

    res.render('inicio', { asados: asados, });
})

app.get('/agregar', function (req, res) {
    res.render('agregar')
})

app.post('/agregar', async function (req, res) {
    // console.log(req.body)
    const {imagen, titulo, descripcion} = req.body

    try {
        const nuevoAsado = await asadoModel.create({
            imagen: imagen,
            titulo: titulo,
            descripcion: descripcion
        });

        if (nuevoAsado) {
            res.redirect('/');
        } else {
            res.send('No se pudo agregar el asado')
        }
    } catch (err) {
        res.send('Se produjo un errror al cargar el asado: ' + err)
    }

    app.get('/eliminar/:id', async function (req, res) {
        const { id } = req.params;
        try {
            const eliminarAsado = await asadoModel.destroy({
                where: {
                    id: id
                }
            })
    
            if (eliminarAsado) {
                res.redirect('/');
            } else {
                res.send('No se pudo eliminar el asado')
            }
        } catch (err) {
            res.send('Se produjo un errror al eliminar el asado: ' + err)
        }
    })

})

app.get('/editar/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const asado = await asadoModel.findOne({
            where: {
                id: id
            }
        })

        if (asado) {
            res.render('editar', { asado: asado });
        } else {
            res.send('No se pudo encontrar el asado')
        }
    } catch (err) {
        res.send('Se produjo un errror buscando el asado: ' + err)
    }
})

app.post('/editar/:id', async function (req, res) {
    const { id } = req.params;
    const {imagen, titulo, descripcion} = req.body
   
    try {
        const asadoActualizado = await asadoModel.update(
            {
            imagen: imagen,
            titulo: titulo,
            descripcion: descripcion
            }, {
                where: {
                    id: id
                }
            }
        )
        
        if (asadoActualizado) {
            res.redirect('/');
        } else {
            res.send('No se pudo actualizar el asado')
        }
    } catch (err) {
        res.send('Se produjo un errror actualizando el asado: ' + err)
    }
})

DBTest()

app.listen(PUERTO, () => {
    console.log(`El servidor está corriendo en el puerto ${PUERTO}`)
})