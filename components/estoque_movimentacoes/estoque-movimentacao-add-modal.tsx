"use client";

import * as z from "zod";
import { BaseModal } from "../custom/base-modal";
import { DynamicForm } from "../custom/dynamic-form";
import { toast } from "sonner";
import { useCreateEstoqueMovimentacao, createEstoqueMovimentacaoSchema } from "@/hooks/use-estoque-movimentacoes";
import { useProdutos } from "@/hooks/use-produtos";
import { useEstoque } from "@/hooks/use-estoque";
import { EstoqueAtualDisplay } from "../estoque/estoque-atual-display";
import { useState } from "react";

export function AddEstoqueMovimentacaoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const createMutation = useCreateEstoqueMovimentacao();
  const { data: produtos } = useProdutos();
  const { data: estoqueData } = useEstoque();

  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const produtoOptions =
    produtos?.map((prod) => ({
      label: prod.nome,
      value: prod.id.toString(),
    })) || [];

  const formFields = [
    {
      name: "produto_id" as const,
      label: "Produto",
      placeholder: "Selecione um produto",
      component: "select" as const,
      options: produtoOptions,
    },
    {
      name: "quantidade" as const,
      label: "Quantidade",
      placeholder: "Ex: 10",
      component: "input" as const,
      type: "number",
    },
    {
      name: "tipo" as const,
      label: "Tipo de Movimentação",
      component: "select" as const,
      options: [
        { label: "Entrada", value: "entrada" },
        { label: "Saída", value: "saida" },
      ],
    },
  ];

  const handleSubmit = (data: z.infer<typeof createEstoqueMovimentacaoSchema>) => {
    if (!data.produto_id) {
      return toast.warning("Por favor, selecione um produto.");
    }

    if (data.quantidade <= 0) {
      return toast.warning("A quantidade deve ser maior que zero.");
    }

    if (data.tipo === "saida") {
      const itemEstoque = estoqueData?.find(e => e.produto_id.toString() === data.produto_id);
      const saldoAtual = itemEstoque?.quantidade || 0;

      if (data.quantidade > saldoAtual) {
        return toast.error(`Saldo insuficiente! Estoque disponível: ${saldoAtual}`);
      }
    }

    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Movimentação registrada!");
        setSelectedProductId("");
        onClose();
      },
      onError: (error) => {
        toast.error(`Erro: ${error.message}`);
      },
    });
  };

  return (
    <BaseModal
      title="Nova Movimentação de Estoque"
      description="Preencha os detalhes para criar uma nova movimentação."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <EstoqueAtualDisplay produtoId={selectedProductId} />

        <DynamicForm
          schema={createEstoqueMovimentacaoSchema}
          onSubmit={handleSubmit}
          fields={formFields}
          defaultValues={{
            produto_id: "",
            quantidade: 0,
            tipo: "entrada",
          }}
          onValuesChange={(values) => {
            if (values.produto_id !== selectedProductId) {
              setSelectedProductId(values.produto_id);
            }
          }}
          submitButtonText="Criar Movimentação"
          isSubmitting={createMutation.isPending}
        />
      </div>
    </BaseModal>
  );
}