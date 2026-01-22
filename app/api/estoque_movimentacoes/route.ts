import { NextResponse } from "next/server";
import * as service from "@/services/estoque_movimentacoes.service";

export async function GET() {
    const estoque_movimentacoes = await service.getAllEstoqueMovimentacoes();
    const estoque_movimentacoesSerialized = estoque_movimentacoes.map(estoque_movimentacoes => {
        return JSON.parse(
            JSON.stringify(estoque_movimentacoes, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
    });
    return NextResponse.json(estoque_movimentacoesSerialized);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { produto_id, quantidade, tipo } = body;
        if (!produto_id) {
            return NextResponse.json({ error: 'Produto ID invalido' }, { status: 400 });
        }
        if (!quantidade || quantidade <= 0) {
            return NextResponse.json({ error: 'Quantidade invalida' }, { status: 400 });
        }
        if (!tipo || tipo !== 'entrada' && tipo !== 'saida') {
            return NextResponse.json({ error: 'Tipo invalido' }, { status: 400 });
        }

        const newEstoqueMovimentacoes = await service.createEstoqueMovimentacoes({
            produto_id,
            quantidade,
            tipo
        });
        const newEstoqueMovimentacoesSerialized = {
            ...newEstoqueMovimentacoes,
            id: newEstoqueMovimentacoes.id.toString()
        };
        return NextResponse.json(newEstoqueMovimentacoesSerialized, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Falha ao criar estoque' }, { status: 500 });
    }
}