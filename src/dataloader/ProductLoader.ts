import DataLoader from 'dataloader';
import ContextType from 'src/graphql/ContextType';

export function ProductLoader(ctx: ContextType) {
  const knex = ctx.knex.default;

  return new DataLoader(async (keys: number[]) => {
    const items = await knex.table('products');
    return keys.map(key => items.find(x => x.id === key));
  });
}
