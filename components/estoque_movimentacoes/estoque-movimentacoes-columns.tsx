"user client"

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { EstoqueMovimentacao } from "@/hooks/use-estoque-movimentacoes";

export const estoqueMovimentacaoColumns: ColumnDef<EstoqueMovimentacao>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "produto.id",
        header: "ID do Produto",
    },
    {
        accessorKey: "produto.sku",
        header: "SKU",
    },
    {
        accessorKey: "produto.nome",
        header: "Nome",
    },
    {
        accessorKey: "quantidade",
        header: "Quantidade",
    },
    {
        accessorKey: "tipo",
        header: "Tipo de Movimentação",
        cell: ({ row }) => {
            const tipo = row.getValue("tipo") as string;
            const formatado = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();

            return (
                <div className={tipo === "entrada" ? "text-green-600" : "text-red-600"}>
                    {formatado}
                </div>
            );
        },
    },
    {
        accessorKey: "criado_em",
        header: "Data da Movimentação:",
        cell: ({ row }) => {
            const date = new Date(row.getValue("criado_em"));
            return format(date, "dd/MM/yyyy HH:mm");
        },
    }
]