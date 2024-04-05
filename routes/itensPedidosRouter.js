const express = require('express');
const router = express.Router();
const itemPedido = require('../controllers/itensPedidos');

router.post('/', itemPedido.insereItemPedido);
router.get('/', itemPedido.mostraItensPedidos);
router.put('/:id', itemPedido.atualizaItemPedido);
router.delete('/:id', itemPedido.apagaItemPedido);

module.exports = router;