const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    exibirMensagem,
    listarMensagemId,
    listarMensagem,
    removerMensagens,
    atualizarMensagens
} = require('./controllers/chat-mensagens.js');

const { listarContatoId,
    listarContatos,
    adicionarContato,
    removerContato,
    atualizarContatos
} = require('./controllers/chat-contatos.js');


//Chamamos express:
const app = express();

//Criamos uma porta:
const port = 3001;

app.use('/images', express.static(path.join(__dirname, '/public/images')));

app.use(cors());
app.use(bodyParser.json());

// get, post, put, delete
// get mostrar uma requisição.
// post armazenar uma requisição.


// listar todas as contatos - get
// listar contatos por id - get
// Exibir contatos - post

// listar todas as contatos - get
app.get('/chat-contatos', listarContatos);
// listar contatos por id - get
app.get('/chat-contatos/:id', listarContatoId);
// Adicionar contatos - post
app.post('/chat-contatos', adicionarContato);
// Excluir contatos - delete
app.delete('/chat-contatos/:id', removerContato);
// Atualizar contatos - put
app.put('/chat-contatos/:id', atualizarContatos);


// Exibir mensagens - post
app.post('/chat-mensagens', exibirMensagem);
// listar mensagens por id - get
app.get('/chat-mensagens/:id', listarMensagemId);
// listar todas as mensagens - get
app.get('/chat-mensagens', listarMensagem);
// Excluir mensagens - delete
app.delete('/chat-mensagens/:id', removerMensagens);
// atualizar uma mensagens - put
app.put('/chat-mensagens/:id', atualizarMensagens);

//Iniciamos a aplicação:
app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));


