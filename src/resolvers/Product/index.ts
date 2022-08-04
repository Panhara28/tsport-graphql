import { CreateProductResolver } from './CreateProductResolver';
import { ProductByIdResolver } from './ProductByIdResolver';
import { ProductListResolver } from './ProductListResolver';
import { UpdateProductResolver } from './UpdateProductResolver';

export const ProductResolver = {
  Query: {
    productList: ProductListResolver,
    product: ProductByIdResolver,
  },
  Mutation: {
    createProduct: CreateProductResolver,
    updateProduct: UpdateProductResolver,
  },
};
