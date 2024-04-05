const express = require('express');
const router = express.Router();
const cliente = require('../controllers/clientes');

router.post('/', cliente.insereCliente);
router.get('/', cliente.mostraClientes);
router.get('/:nome', cliente.mostraClienteNome);
router.put('/:id', cliente.atualizaCliente);
router.delete('/:id', cliente.apagaCliente);

module.exports = router;