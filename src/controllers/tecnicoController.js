const Tecnico = require('../models/tecnico');
const qrService = require('../services/qrService');
const fs = require('fs');
const path = require('path');

const tecnicoController = {
  // Página pública de verificação
  async getVerificacao(req, res) {
    try {
      const { id } = req.params;
      const tecnico = await Tecnico.getById(id);

      if (!tecnico || tecnico.status !== 'ATIVO') {
        return res.render('verificacao', { 
          autorizado: false, 
          tecnico: tecnico || null,
          error: tecnico ? 'Técnico Inativo' : 'Técnico não encontrado'
        });
      }

      res.render('verificacao', { 
        autorizado: true, 
        tecnico,
        error: null
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  },

  // Painel Administrativo - Listagem
  async adminList(req, res) {
    try {
      const tecnicos = await Tecnico.getAll();
      res.render('admin/list', { tecnicos });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar técnicos');
    }
  },

  // Painel Administrativo - Página de Cadastro
  async adminCreatePage(req, res) {
    res.render('admin/create');
  },

  // Painel Administrativo - Criar Técnico
  async createTecnico(req, res) {
    try {
      const { id, nome, cargo, status } = req.body;
      let foto_url = null;

      if (req.file) {
        // Converter imagem para Base64 para persistência no Render
        const imgBuffer = fs.readFileSync(req.file.path);
        const base64 = imgBuffer.toString('base64');
        foto_url = `data:${req.file.mimetype};base64,${base64}`;
        
        // Deletar arquivo temporário
        fs.unlinkSync(req.file.path);
      }

      await Tecnico.create({ id, nome, cargo, status, foto_url });
      res.redirect('/admin');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar técnico');
    }
  },

  // Painel Administrativo - Página de Edição
  async adminEditPage(req, res) {
    try {
      const { id } = req.params;
      const tecnico = await Tecnico.getById(id);
      if (!tecnico) return res.status(404).send('Técnico não encontrado');
      res.render('admin/edit', { tecnico });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  },

  // Painel Administrativo - Atualizar Técnico
  async updateTecnico(req, res) {
    try {
      const { id } = req.params;
      const { nome, cargo, status } = req.body;
      let { foto_url } = req.body;

      if (req.file) {
        const imgBuffer = fs.readFileSync(req.file.path);
        const base64 = imgBuffer.toString('base64');
        foto_url = `data:${req.file.mimetype};base64,${base64}`;
        
        fs.unlinkSync(req.file.path);
      }

      await Tecnico.update(id, { nome, cargo, status, foto_url });
      res.redirect('/admin');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar técnico');
    }
  },

  // Gerar e retornar QR Code (API ou base64 para o admin)
  async getQRCode(req, res) {
    try {
      const { id } = req.params;
      const qrDataUrl = await qrService.generate(id);
      res.json({ qrDataUrl });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
  },

  // --- Autenticação ---
  async loginPage(req, res) {
    res.render('admin/login', { error: null });
  },

  async login(req, res) {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'nivelsmart2026';

    if (username === adminUser && password === adminPass) {
      req.session.isLoggedIn = true;
      res.redirect('/admin');
    } else {
      res.render('admin/login', { error: 'Usuário ou senha inválidos' });
    }
  },

  async logout(req, res) {
    req.session = null;
    res.redirect('/login');
  }
};

module.exports = tecnicoController;
