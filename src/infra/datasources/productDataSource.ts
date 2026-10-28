import type { Produto } from "../../model/entities/Produto";
import type { IProductDataSource } from "../../model/datasources/iProductDataSource";
import { DataSourceError } from "../../model/errors";
import {
  simularConsultaProdutosPorCategoria,
  simularConsultaProdutoPorId,
} from "../../data/mockDatabase";

export class ProductDataSource implements IProductDataSource {
  async getProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    try {
      const produtos = await simularConsultaProdutosPorCategoria(categoriaId);
      return produtos as Produto[];
    } catch {
      throw new DataSourceError("Não foi possível carregar os produtos.");
    }
  }

  async getProdutoPorId(produtoId: string): Promise<Produto | undefined> {
    try {
      const produto = await simularConsultaProdutoPorId(produtoId);
      return produto as Produto | undefined;
    } catch {
      throw new DataSourceError(
        "Não foi possível carregar os detalhes do produto."
      );
    }
  }
}
