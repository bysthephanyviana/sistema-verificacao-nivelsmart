const db = require('../config/database');

const Dispositivo = {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM dispositivos ORDER BY data_criacao DESC');
    return rows;
  },

  async getById(id) {
    const { rows } = await db.query('SELECT * FROM dispositivos WHERE id = $1', [id]);
    return rows[0];
  },

  async create(dispositivo) {
    const { id, nome, id_service, condominio, quantidade_estoque, status } = dispositivo;
    const { rows } = await db.query(
      'INSERT INTO dispositivos (id, nome, id_service, condominio, quantidade_estoque, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, nome, id_service, condominio, quantidade_estoque || 0, status || 'ATIVO']
    );
    return rows[0];
  },

  async update(id, data) {
    const { nome, id_service, condominio, quantidade_estoque, status } = data;
    const { rows } = await db.query(
      'UPDATE dispositivos SET nome = $1, id_service = $2, condominio = $3, quantidade_estoque = $4, status = $5 WHERE id = $6 RETURNING *',
      [nome, id_service, condominio, quantidade_estoque, status, id]
    );
    return rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM dispositivos WHERE id = $1', [id]);
  }
};

module.exports = Dispositivo;
