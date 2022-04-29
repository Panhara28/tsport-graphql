import DataLoader from 'dataloader';
import ContextType from '../graphql/ContextType';

export function ProductCommodityPriceLoader(ctx: ContextType) {
  const knex = ctx.knex.default;

  return new DataLoader(async (keys: number[]) => {
    const result = await knex('product_commodity_detail');

    return keys.map(key => result.find(x => x.commodity_price_id === key));
  });
}
