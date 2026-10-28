import type { Categoria } from "../../model/entities/Categoria";
import type { ICategoryDataSource } from "../../model/datasources/iCategoryDataSource";
import { DataSourceError } from "../../model/errors";
import { simularConsultaCategorias } from "../../data/mockDatabase";

export class CategoryDataSource implements ICategoryDataSource {
  async getCategorias(): Promise<Categoria[]> {
    try {
      const categorias = await simularConsultaCategorias();
      return categorias as Categoria[];
    } catch {
      throw new DataSourceError("Não foi possível carregar as categorias.");
    }
  }
}
