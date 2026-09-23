import { useState, useEffect } from "react";
import { Categoria } from "../models/Categoria";
import { cardapioRepository } from "../repositories/cardapioRepository";

export function useHomeViewModel() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        const resultado = await cardapioRepository.getCategorias();
        setCategorias(resultado);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return {
    carregando,
    categorias,
  };
}
