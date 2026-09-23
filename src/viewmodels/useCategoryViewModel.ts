import { useState, useEffect } from "react";
import { Produto } from "../models/Produto";
import { cardapioRepository } from "../repositories/cardapioRepository";

export function useCategoryViewModel(categoriaId?: string | string[]) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const idNormalizado = Array.isArray(categoriaId) ? categoriaId[0] : categoriaId;

  const nomeCategoria =
    idNormalizado === "bebidas"
      ? "Bebidas"
      : idNormalizado === "comidas"
      ? "Comidas"
      : "Cardápio";

  useEffect(() => {
    async function carregarProdutos() {
      if (!idNormalizado) return;
      try {
        setCarregando(true);
        const resultado = await cardapioRepository.getProdutosPorCategoria(
          idNormalizado
        );
        setProdutos(resultado);
      } catch (erro) {
        console.error("Erro ao buscar produtos da categoria:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [idNormalizado]);

  function formatarPreco(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  return {
    carregando,
    produtos,
    nomeCategoria,
    formatarPreco,
  };
}
