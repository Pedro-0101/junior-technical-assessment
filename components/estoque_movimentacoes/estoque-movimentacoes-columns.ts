"user client"

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EstoqueMovimentacao } from "@/hooks/use-estoque-movimentacoes";

export const estoqueMovimentacaoColumns: ColumnDef<EstoqueMovimentacao>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "produto_id",
        header: "Produto ID",
    },
    {
        accessorKey: "quantidade",
        header: "Quantidade",
    },
    {
        accessorKey: "tipo",
        header: "Tipo",
    },
    {
        accessorKey: "criado_em",
        header: "Criado Em",
        cell: ({ row }) => {
            const date = new Date(row.getValue("criado_em"));
            return format(date, "dd/MM/yyyy HH:mm");
        },
    }
]