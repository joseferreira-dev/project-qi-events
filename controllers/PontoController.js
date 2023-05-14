const Ponto = require('../models/ponto');

const addPonto = async (request, response) => {

    const nome = request.body.nome;
    const geometria = {type: 'Point', coordinates:[request.body.lng, request.body.lat]}

    console.log(geometria);

    Ponto.create({nome, description, geometria})
        .then(()=> response.sendStatus(200))
        .catch(err => response.sendStatus(400));
};

let pontos;
const getPontos = async (request, response) => {
    pontos = await Ponto.findAll();
    response.status(200).send(pontos);
}

const sincronizar = async(request, response) => {
    await Ponto.sync();
};

module.exports = {addPonto, sincronizar, getPontos, pontos};