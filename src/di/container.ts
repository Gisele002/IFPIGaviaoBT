import { CategoryDataSource } from "../infra/datasources/categoryDataSource";
import { ProductDataSource } from "../infra/datasources/productDataSource";
import { MenuUseCases } from "../usecase/menuUseCases";

const categoryDataSource = new CategoryDataSource();
const productDataSource = new ProductDataSource();

export const menuUseCases = new MenuUseCases(
  categoryDataSource,
  productDataSource
);
