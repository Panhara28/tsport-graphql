import DataLoader from 'dataloader';
import ContextType from '../graphql/ContextType';

export function DocumentProvinceLoader(ctx: ContextType) {
  const knex = ctx.knex.default;

  return new DataLoader(async (keys: number[]) => {
    const result = await knex('documents')
      .whereIn('province_id', keys)
      .orderBy('id', 'desc');

    return keys.map(key => {
      return result.filter(x => x.province_id === key);
    });
  });
}
