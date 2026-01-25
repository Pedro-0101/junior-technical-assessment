import * as repository from '@/repositories/produtos.repository';
import { produtos } from '@/generated/prisma/client';
import * as estoqueService from '@/services/estoque.service';

export const getAllProdutos = async (): Promise<produtos[]> => {
  return repository.findAll();
};

export const getProdutoById = async (id: bigint): Promise<produtos | null> => {
  return repository.findById(id);
};

export const createProduto = async (data: Omit<produtos, 'id' | 'criado_em'>, estoque_atual: number = 0): Promise<produtos> => {
  const { sku, nome, categoria_id, estoque_minimo, marca } = data;

  const newProduto = await repository.create({ sku, nome, categoria_id, estoque_minimo, marca });

  await estoqueService.createEstoque({
    produto_id: newProduto.id,
    quantidade: estoque_atual,
  });

  return newProduto;
};

export const updateProduto = async (id: bigint, data: Partial<Omit<produtos, 'id' | 'criado_em'>>): Promise<produtos> => {
  return repository.update(id, data);
};

export const deleteProduto = async (id: bigint): Promise<produtos> => {
  return repository.remove(id);
};
