import DataLoader from 'dataloader';
import ContextType from '../graphql/ContextType';

export function AreaDocumentLoader(ctx: ContextType) {
  const knex = ctx.knex.default;

  return new DataLoader(async (keys: number[]) => {
    const result = await knex('special_economic_zone');

    return keys.map(key => result.find(x => x.id === key));
  });
}
