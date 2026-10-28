import type { Categoria } from "../model/entities/Categoria";
import type { Produto } from "../model/entities/Produto";
import type { ICategoryDataSource } from "../model/datasources/iCategoryDataSource";
import type { IProductDataSource } from "../model/datasources/iProductDataSource";
import type { IMenuUseCases } from "./iMenuUseCases";
import { ValidationError } from "../model/errors";

export class MenuUseCases implements IMenuUseCases {
  constructor(
    private readonly categoryDataSource: ICategoryDataSource,
    private readonly productDataSource: IProductDataSource
  ) {}

  async listarCategorias(): Promise<Categoria[]> {
    return this.categoryDataSource.getCategorias();
  }

  async listarProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    if (!categoriaId || !categoriaId.trim()) {
      throw new ValidationError("Informe uma categoria válida.");
    }

    return this.productDataSource.getProdutosPorCategoria(categoriaId);
  }

  async buscarProdutoPorId(produtoId: string): Promise<Produto | undefined> {
    if (!produtoId || !produtoId.trim()) {
      throw new ValidationError("Informe um produto válido.");
    }

    return this.productDataSource.getProdutoPorId(produtoId);
  }
}
