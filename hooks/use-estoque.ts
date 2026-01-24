import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";

// Zod Schemas
// Geralmente, o estoque é atualizado via ajuste de quantidade
export const updateEstoqueSchema = z.object({
  id: z.string(),
  quantidade: z.number().min(0, "A quantidade não pode ser negativa"),
});

// Types
export type EstoqueItem = {
  id: string;
  produto_id: string;
  quantidade: number;
  atualizado_em: string;
  produto: {
    nome: string;
    sku: string;
    estoque_minimo: number;
  };
};

export type UpdateEstoquePayload = z.infer<typeof updateEstoqueSchema>;

// API Functions
const fetchEstoque = async (): Promise<EstoqueItem[]> => {
  const response = await fetch("/api/estoque");
  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }
  return response.json();
};

const updateEstoque = async (
  payload: UpdateEstoquePayload
): Promise<EstoqueItem> => {
  const response = await fetch(`/api/estoque/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantidade: payload.quantidade }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update inventory");
  }
  return response.json();
};

export const useEstoque = () => {
  return useQuery<EstoqueItem[], Error>({
    queryKey: ["estoque"],
    queryFn: fetchEstoque,
  });
};

export const useUpdateEstoque = () => {
  const queryClient = useQueryClient();
  return useMutation<EstoqueItem, Error, UpdateEstoquePayload>({
    mutationFn: updateEstoque,
    onSuccess: () => {
      // Invalida a lista de estoque e também de produtos, 
      // caso o produto exiba a quantidade em algum lugar
      queryClient.invalidateQueries({ queryKey: ["estoque"] });
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
};