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
