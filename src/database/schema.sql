-- Tabela de Técnicos
CREATE TABLE IF NOT EXISTS tecnicos (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'ATIVO', -- ATIVO ou INATIVO
    foto_url TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir um técnico de exemplo para teste
-- INSERT INTO tecnicos (id, nome, cargo, status) VALUES ('NS-001', 'João Silva', 'Técnico de Campo', 'ATIVO');

-- Tabela de Dispositivos
CREATE TABLE IF NOT EXISTS dispositivos (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100),
    id_service VARCHAR(100) NOT NULL,
    condominio VARCHAR(150) NOT NULL,
    quantidade_estoque INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ATIVO', 
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
