const QRCode = require('qrcode');

const qrService = {
  async generate(id, type = 'tecnico') {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const relPath = type === 'dispositivo' ? `/verificacao/dispositivo/${id}` : `/verificacao/${id}`;
    const url = `${baseUrl}${relPath}`;
    
    try {
      // Gera QR Code como Data URL (base64)
      const qrDataUrl = await QRCode.toDataURL(url, {
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        margin: 2
      });
      return qrDataUrl;
    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
      throw err;
    }
  }
};

module.exports = qrService;
