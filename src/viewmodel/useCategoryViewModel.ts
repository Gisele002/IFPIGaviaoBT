
import { useEffect, useState } from "react";
import type { Produto } from "../model/entities/Produto";
import type { IMenuUseCases } from "../usecase/iMenuUseCases";
import { menuUseCases } from "../di/container";
import { DomainError } from "../model/errors";

export function useCategoryViewModel(
  categoriaId?: string | string[],
  useCases: IMenuUseCases = menuUseCases
) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const idNormalizado = Array.isArray(categoriaId)
    ? categoriaId[0]
    : categoriaId;

  const nomeCategoria =
    idNormalizado === "bebidas"
      ? "Bebidas"
      : idNormalizado === "comidas"
        ? "Comidas"
        : "Cardápio";

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      if (!idNormalizado) {
        setProdutos([]);
        setErro(null);
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        const resultado =
          await useCases.listarProdutosPorCategoria(idNormalizado);

        if (ativo) {
          setProdutos(resultado);
        }
      } catch (error) {
        if (ativo) {
          if (error instanceof DomainError) {
            setErro(error.message);
          } else {
            setErro("Não foi possível carregar os produtos. Tente novamente.");
          }
        }

        console.error("Erro ao buscar produtos da categoria:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, [idNormalizado, useCases]);

  function formatarPreco(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  return {
    carregando,
    produtos,
    nomeCategoria,
    formatarPreco,
    erro,
  };
}
