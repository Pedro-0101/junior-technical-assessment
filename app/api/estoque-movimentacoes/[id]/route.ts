import { NextResponse } from "next/server";
import * as service from '@/services/estoque_movimentacoes.service';

interface Params {
  params: Promise<{ id: string; }>;
}

export async function GET(
    request: Request,
    { params }: Params
) {
    try {
        const id = BigInt((await params).id);
        const estoqueMovimentacoes = await service.getEstoqueMovimentacoesById(id); 
        if (!estoqueMovimentacoes) {
            return NextResponse.json({ error: 'Estoque Movimentações não encontrado' }, { status: 404 });
        }
        const estoqueMovimentacoesSerialized = {
            ...estoqueMovimentacoes,
            id: estoqueMovimentacoes.id.toString()
        };
        return NextResponse.json(estoqueMovimentacoesSerialized);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }
}