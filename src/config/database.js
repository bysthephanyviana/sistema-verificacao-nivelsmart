const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// SSL apenas se for produção ou solicitado via ENV
if (process.env.DB_SSL === 'true') {
  poolConfig.ssl = {
    rejectUnauthorized: false
  };
}

const pool = new Pool(poolConfig);

// Teste de conexão e inicialização
const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Banco de Dados conectado com sucesso!');
    
    // Criar tabela se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS tecnicos (
        id VARCHAR(50) PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cargo VARCHAR(100) NOT NULL,
        status VARCHAR(20) DEFAULT 'ATIVO',
        foto_url TEXT,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabelas verificadas/criadas com sucesso!');
    client.release();
  } catch (err) {
    console.error('❌ Erro no Banco de Dados:', err.message);
  }
};

initDb();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
