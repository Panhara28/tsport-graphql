import ContextType from 'src/graphql/ContextType';
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
    setProductPinDefault: async (_, { id }, ctx: ContextType) => {
      const knex = ctx.knex.default;

      const pro = await knex
        .table('products')
        .where({ id })
        .first();

      await knex
        .table('products')
        .where({ id })
        .update({ pin_default: !pro.pin_default });

      return true;
    },
  },
};
