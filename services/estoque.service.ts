import * as repository from '@/repositories/estoque.repository';
import { estoque } from '@/generated/prisma/client';
import * as produtoService from '@/services/produtos.service';

export const getAllEstoque = async (): Promise<estoque[]> => {
  return repository.findAll();
};

export const getEstoqueById = async (id: bigint): Promise<estoque | null> => {
  return repository.findById(id);
};

export const getAllEstoqueWithProdutos = async (): Promise<estoque[]> => {
  return repository.getAllEstoqueWithProdutos();
};

export const createEstoque = async (data: Omit<estoque, 'id' | 'atualizado_em'>): Promise<estoque> => {
  const { produto_id, quantidade } = data;
  console.log('Creating estoque with data:', data);

  if (!produto_id || !quantidade) {
    throw new Error('Produto ID e quantidade são obrigatórios');
  }
  
  if (quantidade <= 0) {
    throw new Error('Quantidade deve ser maior que zero');
  }

  const produto = await produtoService.getProdutoById(produto_id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }

  const newEstoque = await repository.create({ produto_id, quantidade });
  return newEstoque;
};

export const updateEstoque = async (id: bigint, data: Partial<Omit<estoque, 'id' | 'atualizado_em'>>): Promise<estoque> => {
  return repository.update(id, data);
};

export const deleteEstoque = async (id: bigint): Promise<estoque> => {
  return repository.remove(id);
};

export const getEstoqueByProdutoId = async (produtoId: bigint): Promise<estoque | null> => {
  return repository.findByProdutoId(produtoId);
};