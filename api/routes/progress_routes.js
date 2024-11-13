const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress_controller');

// Rota para inserir um novo progresso
router.post('/inserir', progressController.inserirProgresso);

// Rota para atualizar o progresso de uma disciplina
router.post('/atualizar', progressController.atualizarProgresso);

// Rota para atualizar o progresso de uma aula específica
router.post('/atualizarAula', progressController.atualizarProgressoAula);

// Rota para buscar o progresso por disciplina
router.post('/buscar', progressController.buscarProgressoPorDisciplina);

router.post('/buscarUser', progressController.buscarProgressoPorUsuario);

module.exports = router;
