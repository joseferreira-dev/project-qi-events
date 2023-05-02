const Ponto = require('../models/ponto');

const addPonto = async (request, response) => {

    const nome = request.body.nome;
    const geometria = {type: 'Point', coordinates:[request.body.lng, request.body.lat]}

    console.log(geometria);

    Ponto.create({nome, geometria})
        .then(()=> response.status(200).send('Ponto salvo!'))
        .catch(err => response.status(400).send('Falha ao salvar'));
};

let pontos;
const getPontos = async (request, response) => {
    pontos = await Ponto.findAll();
    response.status(200).send(pontos);
}

const sincronizar = async(request, response) => {
    await Ponto.sync();
    response.status(200).send('Sincronizado');
};

module.exports = {addPonto, sincronizar, getPontos, pontos};