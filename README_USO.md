# Guia de Uso e Configuração

Este guia descreve os passos necessários para configurar o ambiente e as funcionalidades disponíveis no sistema de gestão.

---

## 1. Configuração Inicial

Para rodar o projeto localmente, siga os passos abaixo:

### Variáveis de Ambiente
Crie um arquivo chamado `.env` na raiz do projeto e adicione a seguinte configuração:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/postgres"
```

### Banco de Dados
O projeto utiliza Docker para gerenciar o banco de dados. Suba o container com o comando:
```bash
docker-compose up -d
```

### Dependências
Instale os pacotes necessários utilizando o `npm`:
```bash
npm install
```

### Execução
Inicie o servidor de desenvolvimento com o comando:
```bash
npm run dev
```

---

## 2. Funcionalidades do Sistema

O sistema é dividido em quatro abas principais, todas equipadas com ferramentas de **pesquisa**, **ordenação** e **paginação** nas tabelas.

### Categorias
- **Listagem:** Exibe todas as categorias em uma tabela organizada.
- **Ações:** Cada linha possui botões para **editar** ou **deletar**.
- **Regra de deleção:** O sistema bloqueia a exclusão de categorias que possuem produtos vinculados, garantindo a integridade dos dados.
- **Cadastro:** Permite criar novas categorias informando o nome e, opcionalmente, uma descrição.

### Produtos
- **Listagem:** Exibe os produtos e permite edição ou exclusão.
- **Deleção em cascata:** Ao excluir um produto, todos os registros de estoque e movimentações vinculados a ele são removidos automaticamente.
- **Cadastro:** No formulário de criação, é necessário informar **nome**, **SKU** e **categoria**. Os campos de estoque atual, estoque mínimo e marca são opcionais.

### Estoque
- **Visualização:** Esta aba é dedicada exclusivamente à consulta dos saldos atuais dos produtos.
- **Restrições:** Não é permitido editar, adicionar ou excluir registros diretamente nesta tela, garantindo que o saldo seja alterado apenas via movimentações oficiais.

### Movimentação de estoque
- **Histórico:** Exibe o registro de todas as entradas e saídas realizadas.
- **Nova movimentação:** Botão para registrar uma operação selecionando o produto, o tipo de movimentação (entrada ou saída) e a quantidade.
