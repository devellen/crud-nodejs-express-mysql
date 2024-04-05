const connection = require("../database/data");

exports.insereItemPedido = (req, res) => {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;

    //verifica a disponibilidade do produto antes de inserir nos itens pedidos
    connection.query('SELECT * FROM Produtos WHERE id = ? and disponivel=1', [id_produto], (err, result) => {
        if (err) {
            console.error('erro ao verificar disponibilidade' + err.message);
            res.status(500).json({ error: 'erro ao verificar disponibilidade' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'produto não existente ou quantidade não disponivel' });
            } else {
                connection.query('INSERT INTO ItensPedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)', [id_pedido, id_produto, quantidade, preco_unitario], (err) => {
                    if (err) {
                        console.error('erro ao inserir' + err.message);
                        res.status(500).json({ error: 'erro ao inserir item' });
                    } else {
                        console.log('item inserido com sucesso');
                        res.status(201).json({ message: 'item inserido!' });
                    }
                });
            }
        }
    })
}

exports.mostraItensPedidos = (req, res) => {
    connection.query('SELECT * FROM ItensPedido', (err, results) => {
        if (err) {
            console.error('erro ao buscar itens' + err.message);
            res.status(500).json({ error: 'erro ao buscar itens' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.atualizaItemPedido = (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
    //verifica se o item com o id digitado existe
    connection.query('SELECT * FROM ItensPedido WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao verificar item' + err.message);
            res.status(500).json({ error: 'erro ao verificar item' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'item pedido não encontrado' });
            } else {
                connection.query('UPDATE ItensPedido SET id_pedido = ?, id_produto = ?, quantidade = ?, preco_unitario = ?  WHERE id = ?', [id_pedido, id_produto, quantidade, preco_unitario, id], (err) => {
                    if (err) {
                        console.error('erro ao atualizar item' + err.message);
                        res.status(500).json({ error: 'erro ao atualizar item' });
                    } else {
                        console.log('item atualizado!')
                        res.status(200).json({ message: 'pedido atualizado com sucesso!' });
                    }
                });
            }
        }
    });
}

exports.apagaItemPedido = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM ItensPedido WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao excluir item pedido.' + err.message);
            res.status(500).json({ error: 'erro ao excluir item pedido.' });
        } else {
            if (result.affectedRows > 0) {
                console.log('item pedido excluido!')
                res.status(200).json({ message: 'item pedido excluido com sucesso!' });
            } else {
                console.log('item pedido não encontrado');
                res.status(404).json({ message: 'item pedido não encontrado.' })
            }
        }
    });
}