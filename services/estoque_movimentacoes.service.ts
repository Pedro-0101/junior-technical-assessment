import * as repository from "@/repositories/estoque_movimentacoes.repository";
import { estoque_movimentacoes } from "@/generated/prisma/client";

export const getAllEstoqueMovimentacoes = async (): Promise<estoque_movimentacoes[]> => {
  return repository.findAll();
};

export const getEstoqueMovimentacoesById = async (id: bigint): Promise<estoque_movimentacoes | null> => {
    return repository.findById(id);
};

export const createEstoqueMovimentacoes = async (data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>): Promise<estoque_movimentacoes> => {
    const { produto_id, quantidade, tipo } = data;
    const newEstoqueMovimentacoes = await repository.create({ produto_id, quantidade, tipo });
    return newEstoqueMovimentacoes;
};

export const updateEstoqueMovimentacoes = async (id: bigint, data: Partial<Omit<estoque_movimentacoes, 'id' | 'criado_em'>>): Promise<estoque_movimentacoes> => {
  return repository.update(id, data);
};

export const deleteEstoqueMovimentacoes = async (id: bigint): Promise<estoque_movimentacoes> => {
  return repository.remove(id);
};