const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/tecnicoController');
const upload = require('../services/uploadService');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas Públicas
router.get('/verificacao/:id', tecnicoController.getVerificacao);

// Rotas de Autenticação
router.get('/login', tecnicoController.loginPage);
router.post('/login', tecnicoController.login);
router.get('/logout', tecnicoController.logout);

// Rotas do Painel Administrativo (Protegidas)
router.get('/admin', authMiddleware, tecnicoController.adminList);
router.get('/admin/novo', authMiddleware, tecnicoController.adminCreatePage);
router.post('/admin/novo', authMiddleware, upload.single('foto'), tecnicoController.createTecnico);
router.get('/admin/editar/:id', authMiddleware, tecnicoController.adminEditPage);
router.post('/admin/editar/:id', authMiddleware, upload.single('foto'), tecnicoController.updateTecnico);
router.get('/admin/deletar/:id', authMiddleware, tecnicoController.deleteTecnico);

// API QR Code
router.get('/api/qrcode/:id', tecnicoController.getQRCode);

// Redirecionar / para /admin ou /verificacao (por padrão admin para o dono)
router.get('/', (req, res) => res.redirect('/admin'));

module.exports = router;
