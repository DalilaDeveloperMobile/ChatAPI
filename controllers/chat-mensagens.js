const { uuid } = require('uuidv4');

var date = new Date();
var horaAtual = date.getHours() + ":" + date.getMinutes();

let mensagems = [
    { id: '1', descricao: 'Olá, como vai você?', time: horaAtual, isMe: true },
    { id: '2', descricao: 'Vocês estão bem?', time: horaAtual, isMe: true },
    { id: '3', descricao: 'Está gostando do Curso?', time: horaAtual, isMe: true },

    { id: '4', descricao: 'Estou bem e você?', time: horaAtual, isMe: false },
    { id: '5', descricao: 'Estamos todos bem', time: horaAtual, isMe: false },
    { id: '6', descricao: 'Estou', time: horaAtual, isMe: false }
];
// Obter mensagem por ID
function listarMensagemId(req, res) {
    const id = req.params.id;
    const mensagem = mensagems.filter(mensagem => mensagem.id === id);
    if (mensagem.length === 0) {
        res.status(404).json({ erro: 'Mensagem não encontrada.' });
    }
    res.json(mensagem[0]);
}
// Filtrar Mensagens
function listarMensagem(req, res) {
    const filtroMensagems = req.query['filtro-mensagem'];
    let mensagemsRetornar = mensagems.slice(0);
    // filtrar
    if (filtroMensagems) {
        mensagemsRetornar = mensagemsRetornar.filter(
            m => m.descricao.toLowerCase().indexOf(filtroMensagems.toLowerCase()) === 0);
    }
    // retornar
    res.json({
        totalMensagems: mensagemsRetornar.length,
        mensagems: mensagemsRetornar.slice(0)
    });
}
// Exibir Mensagens
function exibirMensagem(req, res) {
    if (!req.body['descricao'] && !req.body['true']) {
        res.status(400).json({ erro: "Requisição inválida." })
    }

    const mensagem = {
        id: uuid(),
        descricao: req.body['descricao'],
        time: req.body['time'],
        isMe: req.body['true']
    };
    mensagems.push(mensagem);
    res.json(mensagem);

}
// Excluir Mensagens
function removerMensagens(req, res) {
    const id = req.params.id;
    const numMensagens = mensagems.length;
    mensagems = mensagems.filter(mensagem => mensagem.id !== id);
    if (numMensagens === mensagems.length) {
        res.status(404).json({ erro: 'Mensagem não encontrada.' })
    }
    res.json({ msg: 'Mensagem removida com sucesso!' });
}
// Atualizar Mensagens
function atualizarMensagens(req, res) {
    if (!req.body['descricao']) {
        res.status(400).json({ erro: 'Requisição inválida.' });
    }
    const id = req.params.id;
    let mensagemAtualizada = false;
    mensagems = mensagems.map(mensagem => {
        if (mensagem.id === id) {
            mensagem.descricao = req.body['descricao'];
            mensagem.time = req.body['time'];
            mensagem.isMe = req.body['true'];
            mensagemAtualizada = true;
        }
        return mensagem;
    });
    if (!mensagemAtualizada) {
        res.status(404).json({ erro: 'Mensagem não encontrada.' });
    }
    res.json({
        id: id,
        descricao: req.body['descricao'],
        time: req.body['time'],
        isMe: req.body['true']
    });
}

module.exports = {
    exibirMensagem,
    listarMensagemId,
    listarMensagem,
    removerMensagens,
    atualizarMensagens
}