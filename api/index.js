const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { Pool } = require('pg')
const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
  } else {
    console.log('Conexão com banco bem-sucedida! Hora atual:', res.rows[0]);
  }
});


app.get('/api/vendas', (req, res) => {
    res.send('API está rodando');
})


app.post('/api/vendas', async (req, res) => {
    const { cliente, valor, data } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO vendas (cliente, valor, data) VALUES ($1, $2, $3) RETURNING *',
            [cliente, valor, data]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao inserir venda' });
    }
})

app.listen(port, () => {
    console.log('App rodando na porta 3000')
})

