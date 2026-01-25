# Documentação da API

Esta documentação descreve as rotas disponíveis na API do sistema.

**Base URL**: `/api`

---

## Produtos

### `GET /produtos`
Retorna a lista completa de produtos cadastrados.

**Exemplo de resposta:**
```json
[
  {
    "id": "1",
    "sku": "VAS-001",
    "nome": "Vassoura",
    "marca": "Marca Exemplo",
    "estoque_minimo": 5,
    "categoria_id": "1"
  }
]
```

### `POST /produtos`
Cadastra um novo produto e define o estoque inicial.

**Parâmetros (JSON):**
- `sku` (string, **obrigatório**): Código único do produto.
- `nome` (string, **obrigatório**): Nome do produto.
- `categoria_id` (number, **obrigatório**): ID da categoria.
- `estoque_atual` (number, opcional): Quantidade inicial em estoque. Default: 0.
- `estoque_minimo` (number, opcional): Quantidade mínima para alertas. Default: 0.
- `marca` (string, opcional): Marca do produto.

**Exemplo de requisição:**
```json
{
  "sku": "VAS-005",
  "nome": "Vassoura Nova",
  "categoria_id": 1,
  "estoque_atual": 10,
  "estoque_minimo": 5,
  "marca": "Generico"
}
```

### `GET /produtos/[id]`
Retorna um produto específico pelo seu `id`.

### `PUT /produtos/[id]`
Atualiza os dados de um produto específico. O corpo da requisição é o mesmo do `POST`, tirando estoque_atual.

### `DELETE /produtos/[id]`
Remove um produto específico.

---

## Categorias

### `GET /categorias`
Lista todas as categorias cadastradas.

### `POST /categorias`
Cadastra uma nova categoria.

**Parâmetros (JSON):**
- `nome` (string, **obrigatório**): Nome da categoria.
- `descricao` (string, opcional): Descrição da categoria.

### `GET /categorias/[id]`
Retorna uma categoria específica pelo seu `id`.

### `PUT /categorias/[id]`
Atualiza os dados de uma categoria específica.

### `DELETE /categorias/[id]`
Remove uma categoria pelo `id`.
- **Regra:** Retorna erro se a categoria estiver vinculada a algum produto.

---

## Estoque

### `GET /estoque`
Retorna a lista de todos os itens em estoque com informações dos produtos associados.

### `GET /estoque/[id]`
Retorna um item de estoque específico pelo seu `id` de estoque.

### `GET /estoque/produtos/[id]`
Retorna o estoque de um produto específico pelo `id` do **produto**.

---

## Movimentações de Estoque

### `GET /estoque-movimentacoes`
Retorna o histórico de todas as movimentações de estoque (entradas e saídas).

### `POST /estoque-movimentacoes`
Registra uma nova movimentação de estoque (entrada ou saída).

**Parâmetros (JSON):**
- `produto_id` (number, **obrigatório**): ID do produto a ser movimentado.
- `quantidade` (number, **obrigatório**): Quantidade a ser movimentada (deve ser > 0).
- `tipo` (string, **obrigatório**): `"entrada"` ou `"saida"`.

**Exemplo de requisição:**
```json
{
  "produto_id": 10,
  "quantidade": 5,
  "tipo": "entrada"
}
```

**Regras de Negócio:**
- **Saída:** A movimentação é bloqueada se a quantidade em estoque for menor que a quantidade solicitada.
- **Entrada:** A movimentação é bloqueada se a quantidade for menor ou igual a 0.

### `GET /estoque-movimentacoes/[id]`
Retorna uma movimentação de estoque específica pelo seu `id`.
