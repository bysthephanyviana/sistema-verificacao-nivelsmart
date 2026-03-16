const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/tecnicoController');
const upload = require('../services/uploadService');

// Rotas Públicas
router.get('/verificacao/:id', tecnicoController.getVerificacao);

// Rotas do Painel Administrativo
router.get('/admin', tecnicoController.adminList);
router.get('/admin/novo', tecnicoController.adminCreatePage);
router.post('/admin/novo', upload.single('foto'), tecnicoController.createTecnico);
router.get('/admin/editar/:id', tecnicoController.adminEditPage);
router.post('/admin/editar/:id', upload.single('foto'), tecnicoController.updateTecnico);

// API QR Code
router.get('/api/qrcode/:id', tecnicoController.getQRCode);

// Redirecionar / para /admin ou /verificacao (por padrão admin para o dono)
router.get('/', (req, res) => res.redirect('/admin'));

module.exports = router;
