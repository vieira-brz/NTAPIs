require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()


// ler json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


// rotas API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)


// rota inicial
app.get('/', (req, res) => {
    res.json({ message: "Oi express!" })
})


// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PWD = encodeURIComponent(process.env.DB_PWD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@apicluster.kfgnqkj.mongodb.net/`)
    .then(() => {
        console.log('Conectado');
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err);
    })