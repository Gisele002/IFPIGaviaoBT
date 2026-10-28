import type { Produto } from "../entities/Produto";

export interface IProductDataSource {
  getProdutosPorCategoria(categoriaId: string): Promise<Produto[]>;
  getProdutoPorId(produtoId: string): Promise<Produto | undefined>;
}
