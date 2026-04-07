const Dispositivo = require('../models/dispositivoModel');
const qrService = require('../services/qrService');

const dispositivoController = {
  // Página pública de verificação (exibe somente se está ativo/inativo e o condomínio)
  async getVerificacao(req, res) {
    try {
      const { id } = req.params;
      const dispositivo = await Dispositivo.getById(id);

      if (!dispositivo || dispositivo.status !== 'ATIVO') {
        return res.render('verificacaoDispositivo', { 
          autorizado: false, 
          dispositivo: dispositivo || null,
          error: dispositivo ? 'Dispositivo Inativo' : 'Dispositivo não encontrado'
        });
      }

      res.render('verificacaoDispositivo', { 
        autorizado: true, 
        dispositivo,
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
      const dispositivos = await Dispositivo.getAll();
      res.render('admin/dispositivos/list', { dispositivos });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar dispositivos');
    }
  },

  // Painel Administrativo - Página de Cadastro
  async adminCreatePage(req, res) {
    res.render('admin/dispositivos/create');
  },

  // Painel Administrativo - Criar Dispositivo
  async createDispositivo(req, res) {
    try {
      const { id, nome, id_service, condominio, quantidade_estoque, status } = req.body;
      await Dispositivo.create({ id, nome, id_service, condominio, quantidade_estoque, status });
      res.redirect('/admin/dispositivos');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar dispositivo');
    }
  },

  // Painel Administrativo - Página de Edição
  async adminEditPage(req, res) {
    try {
      const { id } = req.params;
      const dispositivo = await Dispositivo.getById(id);
      if (!dispositivo) return res.status(404).send('Dispositivo não encontrado');
      res.render('admin/dispositivos/edit', { dispositivo });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  },

  // Painel Administrativo - Atualizar Dispositivo
  async updateDispositivo(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_service, condominio, quantidade_estoque, status } = req.body;
      await Dispositivo.update(id, { nome, id_service, condominio, quantidade_estoque, status });
      res.redirect('/admin/dispositivos');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar dispositivo');
    }
  },

  // Gerar e retornar QR Code
  async getQRCode(req, res) {
    try {
      const { id } = req.params;
      const qrDataUrl = await qrService.generate(id, 'dispositivo');
      res.json({ qrDataUrl });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
  },

  // Painel Administrativo - Deletar Dispositivo
  async deleteDispositivo(req, res) {
    try {
      const { id } = req.params;
      await Dispositivo.delete(id);
      res.redirect('/admin/dispositivos');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao deletar dispositivo');
    }
  }
};

module.exports = dispositivoController;
