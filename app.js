const express = require('express');
const bodyParser = require('body-parser');
const categoriasRouter = require('./routes/categoriasRouter');
const produtosRouter = require('./routes/produtosRouter');
const clientesRouter = require('./routes/clientesRouter');
const pedidosRouter = require('./routes/pedidosRouter');
const itensPedidosRouter = require('./routes/itensPedidosRouter');

const app = express();
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 5001;

app.use('/categoria', categoriasRouter);
app.use('/produto', produtosRouter);
app.use('/cliente', clientesRouter);
app.use('/pedido', pedidosRouter);
app.use('/itemPedido', itensPedidosRouter);

app.listen(PORT, console.log(`server started ${PORT}`));