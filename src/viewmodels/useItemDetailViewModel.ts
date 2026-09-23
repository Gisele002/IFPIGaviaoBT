import { useState, useEffect } from "react";
import { Produto } from "../models/Produto";
import { cardapioRepository } from "../repositories/cardapioRepository";

export function useItemDetailViewModel(produtoId?: string | string[]) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);

  const idNormalizado = Array.isArray(produtoId) ? produtoId[0] : produtoId;

  useEffect(() => {
    async function carregarDetalhes() {
      if (!idNormalizado) return;
      try {
        setCarregando(true);
        const resultado = await cardapioRepository.getProdutoPorId(idNormalizado);
        setProduto(resultado || null);
      } catch (erro) {
        console.error("Erro ao buscar detalhes do produto:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [idNormalizado]);

  function decrementarQuantidade() {
    if (quantidade > 1) {
      setQuantidade((prev) => prev - 1);
    }
  }

  function incrementarQuantidade() {
    setQuantidade((prev) => prev + 1);
  }

  function formatarPreco(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  return {
    carregando,
    produto,
    quantidade,
    decrementarQuantidade,
    incrementarQuantidade,
    formatarPreco,
  };
}
