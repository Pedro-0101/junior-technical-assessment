import * as repository from '@/repositories/estoque.repository';
import { estoque } from '@/generated/prisma/client';

export const getAllEstoque = async (): Promise<estoque[]> => {
  return repository.findAll();
};

export const getEstoqueById = async (id: bigint): Promise<estoque | null> => {
  return repository.findById(id);
};

export const createEstoque = async (data: Omit<estoque, 'id' | 'atualizado_em'>): Promise<estoque> => {
    const { estoque_id, quantidade } = data;
    const newEstoque = await repository.create({ estoque_id, quantidade });
    return newEstoque;
};

export const updateEstoque = async (id: bigint, data: Partial<Omit<estoque, 'id' | 'atualizado_em'>>): Promise<estoque> => {
  return repository.update(id, data);
};

export const deleteEstoque = async (id: bigint): Promise<estoque> => {
  return repository.remove(id);
};