const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const tecnicoRoutes = require('./routes/tecnicoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de Sessão
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'nivelsmart-secret-key'],
  maxAge: 24 * 60 * 60 * 1000 // 24 horas
}));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', tecnicoRoutes);

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).render('verificacao', { 
    autorizado: false, 
    tecnico: null, 
    error: 'Página não encontrada' 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
