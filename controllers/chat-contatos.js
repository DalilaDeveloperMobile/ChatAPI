const { uuid } = require('uuidv4');

var date = new Date();
var horaTime = date.getHours() + ":" + date.getMinutes();

let contatos = [
    { id: '1', name: 'John Doe', time: horaTime },
    { id: '2', name: 'Diná Moura', time: horaTime },
    { id: '3', name: 'Lucas Moura', time: horaTime },

    { id: '4', name: 'Jonas Falcão', time: horaTime },
    { id: '5', name: 'Mariana Brito', time: horaTime },
    { id: '6', name: 'Dalila Custódio', time: horaTime }
];

// Obter Contatos por ID
function listarContatoId(req, res) {
    const id = req.params.id;
    const contato = contatos.filter(contato => contato.id === id);
    if (contato.length === 0) {
        res.status(404).json({ erro: 'Contato não encontrado.' });
    }
    res.json(contato[0]);
}
// Filtrar Contatos 
function listarContatos(req, res) {
    const filtroContato = req.query['filtro-contato'];
    let contatosRetornar = contatos.slice(0);
    // filtrar
    if (filtroContato) {
        contatosRetornar = contatosRetornar.filter(
            m => m.name.toLowerCase().indexOf(filtroContato.toLowerCase()) === 0);
    }
    // retornar
    res.json({
        totalContatos: contatosRetornar.length,
        contatos: contatosRetornar.slice(0)
    });
}

// Adicionar Contatos
function adicionarContato(req, res) {
    if (!req.body['name']) {
        res.status(400).json({ erro: "Requisição inválida." })
    }

    const contato = {
        id: uuid(),
        name: req.body['name'],
        time: req.body['time'],
    };
    contatos.push(contato);
    res.json(contato);

}

// Excluir Contatos
function removerContato(req, res) {
    const id = req.params.id;
    const numContatos = contatos.length;
    contatos = contatos.filter(contato => contato.id !== id);
    if (numContatos === contatos.length) {
        res.status(404).json({ erro: 'Contato não encontrada.' })
    }
    res.json({ msg: 'Contato removido com sucesso!' });
}

// Atualizar Contatos
function atualizarContatos(req, res) {
    if (!req.body['name']) {
        res.status(400).json({ erro: 'Requisição inválida.' });
    }
    const id = req.params.id;
    let contatoAtualizado = false;
    contatos = contatos.map(contato => {
        if (contato.id === id) {
            contato.name = req.body['name'];
            contato.time = req.body['time'];
            contatoAtualizado = true;
        }
        return contato;
    });
    if (!contatoAtualizado) {
        res.status(404).json({ erro: 'Contato não encontrado.' });
    }
    res.json({
        id: id,
        name: req.body['name'],
        time: req.body['time'],
    });
}

module.exports = {
    listarContatoId,
    listarContatos,
    adicionarContato,
    removerContato,
    atualizarContatos
}