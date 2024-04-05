const express = require('express');
const router = express.Router();
const categoria = require('../controllers/categorias');

router.post('/', categoria.insereCategoria);
router.get('/', categoria.mostraCategorias);
router.put('/:id', categoria.atualizaCategoria);
router.delete('/:id', categoria.apagaCategoria);

module.exports = router;