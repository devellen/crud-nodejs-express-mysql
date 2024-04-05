const express = require('express');
const router = express.Router();
const produto = require('../controllers/produtos');

router.post('/', produto.insereProduto);
router.get('/', produto.mostraProdutos);
router.get('/:nome', produto.procuraProdutoNome);
router.put('/:id', produto.atualizaProduto);
router.delete('/:id', produto.apagaProduto);

module.exports = router;