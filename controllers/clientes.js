const connection = require("../database/data");


exports.insereCliente = (req, res) => {
    const { nome, email, endereco, telefone } = req.body;
    connection.query('INSERT INTO Clientes (nome, email, endereco, telefone) VALUES (?, ?, ?, ?)', [nome, email, endereco, telefone], (err) => {
        if (err) {
            console.error('erro ao inserir' + err.message);
            res.status(500).json({ error: 'erro ao inserir cliente' });
        } else {
            console.log('cliente inserido com sucesso');
            res.status(201).json({ message: 'cliente inserido!' });
        }
    });
}

exports.mostraClientes = (req, res) => {
    connection.query('SELECT * FROM Clientes', (err, results) => {
        if (err) {
            console.error('erro ao buscar cliente' + err.message);
            res.status(500).json({ error: 'erro ao buscar cliente' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.mostraClienteNome = (req, res) => {
    const { nome } = req.params;
    const seachValue = `%${nome}%`
    connection.query('SELECT * FROM clientes where nome like ?', seachValue, (err, results) => {
        if (err) {
            console.error('erro ao buscar cliente' + err.message);
            res.status(500).json({ error: 'erro ao buscar cliente' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.atualizaCliente = (req, res) => {
    const { id } = req.params;
    const { nome, email, endereco, telefone } = req.body;
    //verifica se o cliente com o id digitado existe
    connection.query('SELECT * FROM Clientes WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao atualizar cliente' + err.message);
            res.status(500).json({ error: 'erro ao atualizar cliente' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Cliente não encontrado' });
            } else {
                connection.query('UPDATE Clientes SET nome = ?, email = ?, endereco = ?, telefone = ? WHERE id = ?', [nome, email, endereco, telefone, id], (err) => {
                    if (err) {
                        console.error('erro ao atualizar cliente' + err.message);
                        res.status(500).json({ error: 'erro ao atualizar cliente' });
                    } else {
                        console.log('cliente atualizado!')
                        res.status(200).json({ message: 'cliente atualizado com sucesso!' });
                    }
                });
            }
        }
    });
}

exports.apagaCliente = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Clientes WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao excluir cliente.' + err.message);
            res.status(500).json({ error: 'erro ao excluir cliente.' });
        } else {
            if (result.affectedRows > 0) {
                console.log('cliente excluido!')
                res.status(200).json({ message: 'cliente excluido com sucesso!' });
            } else {
                console.log('cliente não encontrado');
                res.status(404).json({ message: 'cliente não encontrado.' })
            }
        }
    });
}
