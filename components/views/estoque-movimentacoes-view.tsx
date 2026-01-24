"use client"

import { useState } from "react"
import { useEstoqueMovimentacoes } from "@/hooks/use-estoque-movimentacoes"
import { DataTable } from "@/components/custom/data-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { estoqueMovimentacaoColumns } from "../estoque_movimentacoes/estoque-movimentacoes-columns"
import { AddEstoqueMovimentacaoModal } from "../estoque_movimentacoes/estoque-movimentacao-add-modal"

export function EstoqueMovimentacoesView() {
    const { data: estoqueMovimentacoes, isLoading, isError, error } = useEstoqueMovimentacoes();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    if (isError) {
        return (
            <div className="text-red-500">
                Error: {error?.message || "Failed to load estoqueMovimentacoes."}
            </div>
        );
    }
    return (
        <>
            <DataTable
                columns={estoqueMovimentacaoColumns}
                data={estoqueMovimentacoes || []}
                isLoading={isLoading}
                searchComponent={
                    <Input placeholder="Buscar estoqueMovimentacoes..." className="max-w-sm" />
                }
                actionButtons={[
                    <Button key="new-estoqueMovimentacao" onClick={() => setIsAddModalOpen(true)}>
                        Cadastrar Movimentação
                    </Button>,
                ]}
            />
            <AddEstoqueMovimentacaoModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </>
    );
}