# SALES-FIAP

## Descrição do Projeto
O **SALES-FIAP** é uma API desenvolvida em Node.js que gerencia pagamentos e vendas de um sistema comercial. Ele fornece funcionalidades para cadastro e listagem de pagamentos e vendas, além de serviços auxiliares para manipulação de dados.

## Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **Docker**
- **Postgres** 
- **Jest** (para testes)

## Estrutura do Projeto
A estrutura do projeto segue a separação de responsabilidades conforme descrito abaixo:

```
SALES-FIAP/
|-- src/
|   |-- application/  # Contém os casos de uso
|   |-- config/       # Configuração do banco de dados
|   |-- domain/       # Definições de modelos de domínio
|   |-- infrastructure/ # Regras de infraestrutura
|   |-- routes/       # Definição de rotas
|   |-- services/     # Serviços auxiliares
|-- tests/            # Testes unitários e de integração
|-- server.js         # Arquivo principal do servidor
|-- Dockerfile        # Configuração para conteinerização
|-- package.json      # Dependências do projeto
|-- README.md         # Documentação do projeto
```

## Como Rodar Localmente
### 1. Clonar o repositório
```bash
git clone https://github.com/leandrocesar002/sales-fiap
cd SALES-FIAP
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Banco de dados
Banco de dados está na AWS RDS

### 4. Rodar o servidor
```bash
npm start
```
A API estará disponível em `http://localhost:4000`

## Como Testar
Para rodar os testes automatizados:
```bash
npm test
```
Os testes estão localizados na pasta `tests/` e cobrem as principais funcionalidades do sistema.

---


