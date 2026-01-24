"use client";

import { useEstoqueByProductId } from "@/hooks/use-estoque";
import { Loader2 } from "lucide-react";

interface EstoqueAtualDisplayProps {
    produtoId: string;
}

export function EstoqueAtualDisplay({ produtoId }: EstoqueAtualDisplayProps) {
    const { data: estoque, isLoading, isError } = useEstoqueByProductId(produtoId);

    if (!produtoId) {
        return (
            <div className="flex flex-col gap-1.5 py-2">
                <span className="text-sm font-medium text-muted-foreground">Estoque Atual</span>
                <div className="h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground italic">
                    Selecione um produto...
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5 py-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Estoque Atual Disponível
                </span>
                {isLoading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
            </div>

            <div className={`
        h-9 w-full rounded-md border px-3 py-2 text-sm font-bold flex items-center
        ${isError ? "border-red-200 bg-red-50 text-red-600" : "bg-secondary/30 border-secondary"}
      `}>
                {isLoading ? (
                    <span className="text-muted-foreground font-normal">Consultando saldo...</span>
                ) : isError ? (
                    "Erro ao carregar saldo"
                ) : (
                    <span className={estoque?.quantidade && estoque.quantidade > 0 ? "text-primary" : "text-destructive"}>
                        {estoque?.quantidade ?? 0} unidades
                    </span>
                )}
            </div>

            {!isLoading && !isError && estoque?.quantidade === 0 && (
                <p className="text-[10px] text-destructive font-medium uppercase tracking-tight">
                    Atenção: Produto sem saldo em estoque.
                </p>
            )}
        </div>
    );
}