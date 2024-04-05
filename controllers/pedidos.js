const connection = require("../database/data");

exports.inserePedido = (req, res) => {
    const { id_cliente, data_pedido, status } = req.body;

    connection.query('INSERT INTO Pedidos (id_cliente, data_pedido, status) VALUES (?, ?, ?)', [id_cliente, data_pedido, status], (err) => {
        if (err) {
            console.error('erro ao inserir' + err.message);
            res.status(500).json({ error: 'erro ao inserir pedido' });
        } else {
            console.log('pedido inserido com sucesso');
            res.status(201).json({ message: 'pedido inserido!' });
        }
    });
}

exports.mostraPedidos = (req, res) => {
    connection.query('SELECT * FROM Pedidos', (err, results) => {
        if (err) {
            console.error('erro ao buscar pedido' + err.message);
            res.status(500).json({ error: 'erro ao buscar pedido' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.mostraPedidosStatus = (req, res) => {
    const { status } = req.params;
    const seachValue = `%${status}%`
    connection.query('SELECT * FROM pedidos where status like ?', seachValue, (err, results) => {
        if (err) {
            console.error('erro ao buscar cliente' + err.message);
            res.status(500).json({ error: 'erro ao buscar cliente' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.atualizaPedido = (req, res) => {
    const { id } = req.params;
    const { id_cliente, data_pedido, status } = req.body;
    //verifica se o cliente com o id digitado existe
    connection.query('SELECT * FROM Pedidos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao verificar pedido' + err.message);
            res.status(500).json({ error: 'erro ao verificar pedido' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Pedido não encontrado' });
            } else {
                connection.query('UPDATE Pedidos SET id_cliente = ?, data_pedido = ?, status = ? WHERE id = ?', [id_cliente, data_pedido, status, id], (err) => {
                    if (err) {
                        console.error('erro ao atualizar pedido' + err.message);
                        res.status(500).json({ error: 'erro ao atualizar pedido' });
                    } else {
                        console.log('pedido atualizado!')
                        res.status(200).json({ message: 'pedido atualizado com sucesso!' });
                    }
                });
            }
        }
    });
}

exports.apagaPedido = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Pedidos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao excluir pedido.' + err.message);
            res.status(500).json({ error: 'erro ao excluir pedido.' });
        } else {
            if (result.affectedRows > 0) {
                console.log('pedido excluido!')
                res.status(200).json({ message: 'pedido excluido com sucesso!' });
            } else {
                console.log('pedido não encontrado');
                res.status(404).json({ message: 'pedido não encontrado.' })
            }
        }
    });
}