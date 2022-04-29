import Dataloader from 'dataloader';
import ContextType from '../graphql/ContextType';

export function ProductCategoryListLoader(ctx: ContextType) {
  const knex = ctx.knex.default;

  return new Dataloader(async (keys: number[]) => {
    const result = await knex('products').whereIn('product_category_id', keys);

    return keys.map(key => result.filter(x => x.product_category_id === key));
  });
}
