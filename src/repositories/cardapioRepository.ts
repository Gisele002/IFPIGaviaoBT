import { Categoria } from "../models/Categoria";
import { Produto } from "../models/Produto";
import {
  simularConsultaCategorias,
  simularConsultaProdutosPorCategoria,
  simularConsultaProdutoPorId,
} from "../data/mockDatabase";

export const cardapioRepository = {
  async getCategorias(): Promise<Categoria[]> {
    const dados = await simularConsultaCategorias();
    return dados as Categoria[];
  },

  async getProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    const dados = await simularConsultaProdutosPorCategoria(categoriaId);
    return dados as Produto[];
  },

  async getProdutoPorId(produtoId: string): Promise<Produto | undefined> {
    const dado = await simularConsultaProdutoPorId(produtoId);
    return dado as Produto | undefined;
  },
};
