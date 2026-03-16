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
      const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

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
        foto_url = `/uploads/${req.file.filename}`;
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
  }
};

module.exports = tecnicoController;
