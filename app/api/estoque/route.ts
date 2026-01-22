import { NextResponse } from "next/server";
import * as service from "@/services/estoque.service";

export async function GET() {
    const estoque = await service.getAllEstoque();
    const estoqueSerialized = estoque.map(estoque => {
        return JSON.parse(
            JSON.stringify(estoque, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
    });
    return NextResponse.json(estoqueSerialized);
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