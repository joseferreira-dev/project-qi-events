require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const port = process.env.API_PORT;
const pontoController = require('./controllers/PontoController')

pontoController.sincronizar();

app.get('/', pontoController.sincronizar);
app.get('/getPontos', pontoController.getPontos);
app.post('/pontos', pontoController.addPonto);

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});