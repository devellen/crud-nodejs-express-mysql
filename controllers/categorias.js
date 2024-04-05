const connection = require("../database/data");

exports.insereCategoria = (req, res) => {
    const { nome, descricao } = req.body;
    connection.query('INSERT INTO Categorias (nome, descricao) VALUES (?, ?)', [nome, descricao], (err, result) => {
        if (err) {
            console.error('erro ao inserir' + err.message);
            res.status(500).json({ error: 'erro ao inserir categoria' });
        } else {
            console.log('categoria inserida com sucesso');
            res.status(201).json({ message: 'categoria inserida!' });
        }
    });
}

exports.mostraCategorias = (req, res) => {
    connection.query('SELECT * FROM Categorias', (err, results) => {
        if (err) {
            console.error('erro ao buscar categorias' + err.message);
            res.status(500).json({ error: 'erro ao buscar categorias' });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.atualizaCategoria = (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    //verifica se a categoria com o id digitado existe
    connection.query('SELECT * FROM Categorias WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('erro ao atualizar categoria' + err.message);
            res.status(500).json({ error: 'erro ao atualizar categoria' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Categoria não encontrada' });
            } else {
    
                const sql = 'UPDATE Categorias SET nome = ?, descricao = ? WHERE id = ?';
                connection.query(sql, [nome, descricao, id], (err, result) => {
                    if (err) {
                        console.error('erro ao atualizar categoria' + err.message);
                        res.status(500).json({ error: 'erro ao atualizar categoria' });
                    } else {
                        console.log('categoria atualizado!')
                        res.status(200).json({ message: 'categoria atualizada com sucesso!' });
                    }
                });
            }
        }
    });
}

exports.apagaCategoria = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Categorias WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('erro ao excluir registro, chave primaria etá sendo apontada em outra tabela' + err.message);
            res.status(500).json({ error: 'erro ao excluir registro, chave primaria etá sendo apontada em outra tabela' });
        } else {
            if (result.affectedRows > 0) {
                console.log('categoria excluida!')
                res.status(200).json({ message: 'categoria excluida com sucesso!' });
            } else {
                console.log('categoria não encontrada');
                res.status(404).json({ message: 'categoria não encontrada.' })
            }
        }
    });
}
