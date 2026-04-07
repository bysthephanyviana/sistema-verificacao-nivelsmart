const express = require('express');
const router = express.Router();
const dispositivoController = require('../controllers/dispositivoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota Pública de Verificação do Dispositivo
router.get('/verificacao/dispositivo/:id', dispositivoController.getVerificacao);

// Rotas do Painel Administrativo (Protegidas)
router.get('/admin/dispositivos', authMiddleware, dispositivoController.adminList);
router.get('/admin/dispositivos/novo', authMiddleware, dispositivoController.adminCreatePage);
router.post('/admin/dispositivos/novo', authMiddleware, dispositivoController.createDispositivo);
router.get('/admin/dispositivos/editar/:id', authMiddleware, dispositivoController.adminEditPage);
router.post('/admin/dispositivos/editar/:id', authMiddleware, dispositivoController.updateDispositivo);
router.get('/admin/dispositivos/deletar/:id', authMiddleware, dispositivoController.deleteDispositivo);

// API QR Code (sem authMiddleware — chamado via fetch no admin, consistente com rota de técnicos)
router.get('/api/dispositivo/qrcode/:id', dispositivoController.getQRCode);

module.exports = router;
