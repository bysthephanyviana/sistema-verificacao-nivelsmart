const db = require('../config/database');

const Tecnico = {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM tecnicos ORDER BY data_criacao DESC');
    return rows;
  },

  async getById(id) {
    const { rows } = await db.query('SELECT * FROM tecnicos WHERE id = $1', [id]);
    return rows[0];
  },

  async create(tecnico) {
    const { id, nome, cargo, status, foto_url } = tecnico;
    const { rows } = await db.query(
      'INSERT INTO tecnicos (id, nome, cargo, status, foto_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, nome, cargo, status || 'ATIVO', foto_url]
    );
    return rows[0];
  },

  async update(id, data) {
    const { nome, cargo, status, foto_url } = data;
    const { rows } = await db.query(
      'UPDATE tecnicos SET nome = $1, cargo = $2, status = $3, foto_url = $4 WHERE id = $5 RETURNING *',
      [nome, cargo, status, foto_url, id]
    );
    return rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM tecnicos WHERE id = $1', [id]);
  }
};

module.exports = Tecnico;
