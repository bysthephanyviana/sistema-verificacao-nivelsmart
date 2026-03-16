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

// Teste de conexão imediato
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar no Banco de Dados:', err.message);
  } else {
    console.log('✅ Banco de Dados conectado com sucesso!');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
