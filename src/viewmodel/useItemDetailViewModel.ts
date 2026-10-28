
import { useEffect, useState } from "react";
import type { Produto } from "../model/entities/Produto";
import type { IMenuUseCases } from "../usecase/iMenuUseCases";
import { menuUseCases } from "../di/container";
import { DomainError } from "../model/errors";

export function useItemDetailViewModel(
  produtoId?: string | string[],
  useCases: IMenuUseCases = menuUseCases
) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [erro, setErro] = useState<string | null>(null);

  const idNormalizado = Array.isArray(produtoId)
    ? produtoId[0]
    : produtoId;

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhes() {
      if (!idNormalizado) {
        setProduto(null);
        setErro(null);
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        const resultado = await useCases.buscarProdutoPorId(idNormalizado);

        if (ativo) {
          setProduto(resultado ?? null);
        }
      } catch (error) {
        if (ativo) {
          if (error instanceof DomainError) {
            setErro(error.message);
          } else {
            setErro("Não foi possível carregar os detalhes do produto. Tente novamente.");
          }
        }

        console.error("Erro ao buscar detalhes do produto:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDetalhes();

    return () => {
      ativo = false;
    };
  }, [idNormalizado, useCases]);

  function decrementarQuantidade() {
    setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));
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
    erro,
  };
}
