import { NextResponse } from "next/server";
import * as service from "@/services/estoque.service";

export async function GET() {
  try {
    const estoque = await service.getAllEstoqueWithProdutos();
    const estoqueSerialized = estoque
      .filter(item => item.produtos) 
      .map((item) => ({
        id: item.id.toString(),
        produto_id: item.produto_id.toString(),
        quantidade: item.quantidade,
        atualizado_em: item.atualizado_em,
        produto: {
          sku: item.produtos.sku,
          nome: item.produtos.nome,
          estoque_minimo: item.produtos.estoque_minimo,
        }
      }));

    return NextResponse.json(estoqueSerialized);
  } catch (error) {
    console.error("Erro na rota GET estoque:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { produto_id, quantidade } = body;
        if (!produto_id) {
            return NextResponse.json({ error: 'Produto ID invalido' }, { status: 400 });
        }
        if (!quantidade || quantidade <= 0) {
            return NextResponse.json({ error: 'Quantidade invalida' }, { status: 400 });
        }

        const newEstoque = await service.createEstoque({ produto_id, quantidade });
        const newEstoqueSerialized = {
            ...newEstoque,
            id: newEstoque.id.toString()
        };
        return NextResponse.json(newEstoqueSerialized, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Falha ao criar estoque' }, { status: 500 });
    }
}