
import { useEffect, useState } from "react";
import type { Categoria } from "../model/entities/Categoria";
import type { IMenuUseCases } from "../usecase/iMenuUseCases";
import { menuUseCases } from "../di/container";
import { DomainError } from "../model/errors";

export function useHomeViewModel(
  useCases: IMenuUseCases = menuUseCases
) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        setCarregando(true);
        setErro(null);

        const resultado = await useCases.listarCategorias();

        if (ativo) {
          setCategorias(resultado);
        }
      } catch (error) {
        if (ativo) {
          if (error instanceof DomainError) {
            setErro(error.message);
          } else {
            setErro("Não foi possível carregar as categorias. Tente novamente.");
          }
        }

        console.error("Erro ao carregar categorias:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [useCases]);

  return {
    carregando,
    categorias,
    erro,
  };
}
