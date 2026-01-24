"use client"

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EstoqueItem } from "@/hooks/use-estoque";

export const estoqueColumns: ColumnDef<EstoqueItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "produto.sku",
    header: "SKU",
  },
  {
    accessorKey: "produto.nome",
    header: "Produto",
  },
  {
    accessorKey: "quantidade",
    header: "Estoque Atual",
  },
  {
    accessorKey: "produto.estoque_minimo",
    header: "Estoque Mínimo",
  },
  {
    accessorKey: "atualizado_em",
    header: "Atualizado Em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("atualizado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];