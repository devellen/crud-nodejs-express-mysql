const express = require('express');
const router = express.Router();
const pedido = require('../controllers/pedidos');

router.post('/', pedido.inserePedido);
router.get('/', pedido.mostraPedidos);
router.get('/:status', pedido.mostraPedidosStatus);
router.put('/:id', pedido.atualizaPedido);
router.delete('/:id', pedido.apagaPedido);

module.exports = router;