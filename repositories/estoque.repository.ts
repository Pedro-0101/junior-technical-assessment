import prisma from "@/lib/db";
import { estoque } from "@/generated/prisma/client";

export const findAll = async (): Promise<estoque[]> => {
    return prisma.estoque.findMany();
};

export const findById = async (id: bigint): Promise<estoque | null> => {
    return prisma.estoque.findUnique({
        where: { id },
    });
};

export const create = async (data: Omit<estoque, 'id' | 'criado_em'>): Promise<estoque> => {
    return prisma.estoque.create({
        data: {
            id_produto: data.id_produto,
            quantidade: data.quantidade,
        },
    });
};

export const update = async (id: bigint, data: Partial<Omit<estoque, 'id' | 'criado_em'>>): Promise<estoque> => {
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