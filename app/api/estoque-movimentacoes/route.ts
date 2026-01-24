import { NextResponse } from "next/server";
import * as service from "@/services/estoque_movimentacoes.service";

export async function GET() {
    try {
        const movimentacoes = await service.getAllEstoqueMovimentacoesWithProdutos();

        const estoque_movimentacoesSerialized = movimentacoes.map((item) => {
            const movimentacao = {
                id: item.id.toString(),
                produto: {
                    id: item.produtos.id.toString(),
                    sku: item.produtos.sku,
                    nome: item.produtos.nome,
                },
                quantidade: item.quantidade,
                tipo: item.tipo as "entrada" | "saida", // Cast para o seu Enum
                criado_em: item.criado_em?.toISOString() || new Date().toISOString(),
            };
            return movimentacao;
        });

        return NextResponse.json(estoque_movimentacoesSerialized);
    } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
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