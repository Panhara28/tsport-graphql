import Dataloader from 'dataloader';
import ContextType from '../graphql/ContextType';

export function DocumentLoader(ctx: ContextType) {
  const knex = ctx.knex.default;

  return new Dataloader(async (keys: number[]) => {
    const result = await knex('documents').whereIn('document_category_id', keys);

    return keys.map(key => result.filter(x => x.document_category_id === key));
  });
}
