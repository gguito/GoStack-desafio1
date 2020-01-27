const express = require('express');

const server = express();
server.use(express.json());

const arrProjects = [];

//Middlewares

function checkIfIdExists(req, res, next) {
  const { id } = req.params;
  const project = arrProjects.find(item => item.id == id);

  if (!project) {
    return res.status(400).send('ID não existe');
  }
  next();
}

function listarRequisicoes (req, res, next) {
  console.count("numero de requisicoes");
  next();
}

server.use(listarRequisicoes);

//Listar todas tarefas
server.get('/projects', (req, res) => {
  res.json(arrProjects);
})

// Criação de nova tarefa
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  arrProjects.push(project);

  return res.send(`Tarefa de id: ${id} foi criada.`);
})

//Editar título
server.put('/projects/:id', checkIfIdExists, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const project = arrProjects.find(item => item.id == id);
  project.title = title;

  return res.json(project);
})

//Deletar por ID
server.delete('/projects/:id', checkIfIdExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = arrProjects.findIndex(item => item.id == id);
  
  arrProjects.splice(projectIndex, 1);

  return res.send(`A Tarefa de id ${id} foi removida.`);
})

//Adicionando tarefas por ID
server.post('/projects/:id/tasks', checkIfIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = arrProjects.find(item => item.id == id);
  project.tasks.push(title);

  return res.json(project);
})


server.listen(3333, () => {
  console.log('Server Funcionando em localhost:3333');
})