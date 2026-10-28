import type { Categoria } from "../entities/Categoria";

export interface ICategoryDataSource {
  getCategorias(): Promise<Categoria[]>;
}
