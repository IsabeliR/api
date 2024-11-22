const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress_controller');

// Rota para inserir um novo progresso
router.post('/inserir', progressController.inserirProgresso);
// Rota para atualizar o progresso de uma disciplina
router.put('/atualizar', progressController.atualizarProgresso);
// Rota para atualizar o progresso de uma aula específica
router.post('/atualizarAula', progressController.atualizarProgressoAula);
router.post('/buscar', progressController.buscarProgressoPorDisciplina);
router.post('/buscarUser', progressController.buscarProgressoPorUsuario);
router.get('/buscarProgresso', progressController.buscarProgresso);

module.exports = router;