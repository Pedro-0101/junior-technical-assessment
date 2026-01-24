import { NextResponse } from "next/server";
import * as service from '@/services/estoque.service';

interface Params {
    params: Promise<{ id: string; }>;
}

export async function GET(
    request: Request,
    { params }: Params
) {
    try {
        const { id } = await params;
        const productId = BigInt(id);
        
        const estoque = await service.getEstoqueById(productId);
        
        if (!estoque) {
            return NextResponse.json({ error: 'Estoque não encontrado' }, { status: 404 });
        }

        const serialized = JSON.stringify(estoque, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        return new NextResponse(serialized, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }
}