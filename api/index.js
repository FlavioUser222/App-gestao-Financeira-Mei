const express = require('express')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())


app.get('/vendas', (req, res) => {
    


})

app.post('/vendas', async (req, res) => {
    console.log('Recebido POST /api/vendas com body:', req.body);
    const { cliente, valor, data } = req.body



})


app.listen(port, () => {
    console.log('App rodando na porta 3000')
})

