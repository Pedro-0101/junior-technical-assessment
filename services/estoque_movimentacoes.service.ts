import * as repository from "@/repositories/estoque_movimentacoes.repository";
import { estoque_movimentacoes } from "@/generated/prisma/client";
import * as estoqueService from "@/services/estoque.service";

export const getAllEstoqueMovimentacoes = async (): Promise<estoque_movimentacoes[]> => {
  return repository.findAll();
};

export const getEstoqueMovimentacoesById = async (id: bigint): Promise<estoque_movimentacoes | null> => {
    return repository.findById(id);
};

export const createEstoqueMovimentacoes = async (data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>): Promise<estoque_movimentacoes> => {
    const { produto_id, quantidade, tipo } = data;

    if (!produto_id || !quantidade || !tipo) {
      throw new Error('Produto ID, quantidade e tipo são obrigatórios');
    }
  
    if (quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }

    if(tipo !== 'entrada' && tipo !== 'saida') {
      throw new Error('Tipo deve ser "entrada" ou "saida"');
    }
    
    const estoqueProduto = await estoqueService.getEstoqueByProdutoId(produto_id);
    if (!estoqueProduto) {
      throw new Error('Produto não encontrado no estoque');
    }

    if (tipo === 'saida' && quantidade > estoqueProduto.quantidade) {
      throw new Error('Quantidade de saída maior que a quantidade em estoque');
    }

    const newEstoqueMovimentacoes = await repository.create({ produto_id, quantidade, tipo });

    if(newEstoqueMovimentacoes.tipo === 'entrada') {
      await estoqueService.updateEstoque(estoqueProduto.id, { quantidade: estoqueProduto.quantidade + quantidade });
    }
    if(newEstoqueMovimentacoes.tipo === 'saida') {
      await estoqueService.updateEstoque(estoqueProduto.id, { quantidade: estoqueProduto.quantidade - quantidade });
    }

    return newEstoqueMovimentacoes;
};

export const updateEstoqueMovimentacoes = async (id: bigint, data: Partial<Omit<estoque_movimentacoes, 'id' | 'criado_em'>>): Promise<estoque_movimentacoes> => {
  return repository.update(id, data);
};

export const deleteEstoqueMovimentacoes = async (id: bigint): Promise<estoque_movimentacoes> => {
  return repository.remove(id);
};