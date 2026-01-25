import prisma from "@/lib/db";
import { estoque } from "@/generated/prisma/client";

export const findAll = async (): Promise<estoque[]> => {
    return prisma.estoque.findMany();
};

export const getAllEstoqueWithProdutos = async () => {
    return prisma.estoque.findMany({
        include: {
            produtos: {
                select: {
                    sku: true,
                    nome: true,
                    estoque_minimo: true,
                }
            },
        },
    });
};

export const findById = async (id: bigint): Promise<estoque | null> => {
    return prisma.estoque.findUnique({
        where: { id },
    });
};

export const create = async (data: Omit<estoque, 'id' | 'atualizado_em'>): Promise<estoque> => {
    return prisma.estoque.create({
        data: {
            produto_id: data.produto_id,
            quantidade: data.quantidade,
        },
    });
};

export const update = async (id: bigint, data: Partial<Omit<estoque, 'id' | 'atualizado_em'>>): Promise<estoque> => {
    return prisma.estoque.update({
        where: { id },
        data,
    });
};

export const remove = async (id: bigint): Promise<estoque> => {
    return prisma.estoque.delete({
        where: { id },
    });
};

export const findByProdutoId = async (produtoId: bigint): Promise<estoque | null> => {
    return prisma.estoque.findFirst({
        where: { produto_id: produtoId },
    });
};