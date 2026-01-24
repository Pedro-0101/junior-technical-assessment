import prisma from "@/lib/db";
import { estoque_movimentacoes } from "@/generated/prisma/client";

export const findAll = async (): Promise<estoque_movimentacoes[]> => {
    return prisma.estoque_movimentacoes.findMany();
};

export const findAllWithProdutos = async () => {
    return prisma.estoque_movimentacoes.findMany({
        include: {
            produtos: {
                select: {
                    id: true,
                    sku: true,
                    nome: true,
                }
            },
        },
    });
};

export const findById = async (id: bigint): Promise<estoque_movimentacoes | null> => {
    return prisma.estoque_movimentacoes.findUnique({
        where: { id },
    });
};

export const create = async (data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>): Promise<estoque_movimentacoes> => {
    return prisma.estoque_movimentacoes.create({
        data: {
            id_produto: data.id_produto,
            quantidade: data.quantidade,
            tipo_movimentacao: data.tipo_movimentacao,
            data_movimentacao: data.data_movimentacao,
        },
    });
};

export const update = async (id: bigint, data: Partial<Omit<estoque_movimentacoes, 'id' | 'criado_em'>>): Promise<estoque_movimentacoes> => {
    return prisma.estoque_movimentacoes.update({
        where: { id },
        data,
    });
};

export const remove = async (id: bigint): Promise<estoque_movimentacoes> => {
    return prisma.estoque_movimentacoes.delete({
        where: { id },
    });
};