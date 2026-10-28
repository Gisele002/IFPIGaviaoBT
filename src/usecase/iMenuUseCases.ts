import type { Categoria } from "../model/entities/Categoria";
import type { Produto } from "../model/entities/Produto";

export interface IMenuUseCases {
  listarCategorias(): Promise<Categoria[]>;
  listarProdutosPorCategoria(categoriaId: string): Promise<Produto[]>;
  buscarProdutoPorId(produtoId: string): Promise<Produto | undefined>;
}
