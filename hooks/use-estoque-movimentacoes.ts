import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";

// Zod Schemas
export const createEstoqueMovimentacaoSchema = z.object({
    product_id: z.string(),
    quantidade: z.number().min(0, "A quantidade não pode ser negativa"),
    tipo: z.enum(["entrada", "saida"]),
});

// Types
export type EstoqueMovimentacao = {
    id: string;
    produto_id: string;
    quantidade: number;
    tipo: "entrada" | "saida";
    criado_em: string;
};

export type CreateEstoqueMovimentacaoPayload = z.infer<typeof createEstoqueMovimentacaoSchema>;

// API Functions
const fetchEstoqueMovimentacoes = async (): Promise<EstoqueMovimentacao[]> => {
    const response = await fetch("/api/estoque-movimentacoes");
    if (!response.ok) {
        throw new Error("Failed to fetch inventory movements");
    }
    return response.json();
};

const createEstoqueMovimentacao = async (
    payload: CreateEstoqueMovimentacaoPayload
): Promise<EstoqueMovimentacao> => {
    const response = await fetch("/api/estoque-movimentacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create inventory movement");
    }
    return response.json();
};

// React Query Hooks
export const useEstoqueMovimentacoes = () => {
    return useQuery<EstoqueMovimentacao[], Error>({
        queryKey: ["estoque-movimentacoes"],
        queryFn: fetchEstoqueMovimentacoes,
    });
};

export const useCreateEstoqueMovimentacao = () => {
    const queryClient = useQueryClient();
    return useMutation<EstoqueMovimentacao, Error, CreateEstoqueMovimentacaoPayload>({
        mutationFn: createEstoqueMovimentacao,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["estoque-movimentacoes"] });
        },
    });
};