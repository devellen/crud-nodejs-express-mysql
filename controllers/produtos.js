const connection = require("../database/data");

exports.insereProduto = (req, res) => {
    const { nome, descricao, preco, id_categoria, disponivel } = req.body;

    connection.query('INSERT INTO Produtos (nome, descricao, preco, id_categoria, disponivel) VALUES (?, ?, ?, ?, ?)', [nome, descricao, preco, id_categoria, disponivel], (err, result) => {
        if (err) {
            console.error('erro ao inserir' + err.message);
            res.status(500).json({ error: 'erro ao inserir produto' });
        } else {
            console.log('produto inserido com sucesso');
            res.status(201).json({ message: 'produto inserido!' });
        }
    });
}

exports.mostraProdutos = (req, res) => {
    connection.query('SELECT * FROM Produtos', (err, results) => {
        if (err) {
            console.error('erro ao buscar produtos' + err.message);
            res.status(500).json({ error: 'erro ao buscar produtos' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.procuraProdutoNome = (req, res) => {
    const { nome } = req.params;
    const sql = 'SELECT nome, descricao, preco, disponivel FROM produtos where nome like ?';
    const seachValue = `%${nome}%`
    connection.query(sql, seachValue, (err, results) => {
        if (err) {
            console.error('erro ao buscar produto' + err.message);
            res.status(500).json({ error: 'erro ao buscar produto' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.atualizaProduto = (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, id_categoria, disponivel } = req.body;

    //verifica se o produto com o id digitado existe
    connection.query('SELECT * FROM Produtos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao atualizar produto' + err.message);
            res.status(500).json({ error: 'erro ao atualizar produto' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Produto não encontrado' });
            } else {
                connection.query('UPDATE Produtos SET nome = ?, descricao = ?, preco = ?, id_categoria = ?, disponivel = ? WHERE id = ?', [nome, descricao, preco, id_categoria, disponivel, id], (err, result) => {
                    if (err) {
                        console.error('erro ao atualizar produto' + err.message);
                        res.status(500).json({ error: 'erro ao atualizar produto' });
                    } else {
                        console.log('produto atualizado!')
                        res.status(200).json({ message: 'produto atualizado com sucesso!' });
                    }
                });
            }
        }
    });
}

exports.apagaProduto = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Produtos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao excluir produto.' + err.message);
            res.status(500).json({ error: 'erro ao excluir produto.' });
        } else {
            if (result.affectedRows > 0) {
                console.log('produto excluido!')
                res.status(200).json({ message: 'produto excluido com sucesso!' });
            } else {
                console.log('produto não encontrado');
                res.status(404).json({ message: 'produto não encontrado.' })
            }
        }
    });
}
