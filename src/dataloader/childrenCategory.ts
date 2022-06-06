import Dataloader from 'dataloader';
import ContextType from '../graphql/ContextType';

export function ChildrenCategory(ctx: ContextType) {
  const knex = ctx.knex.default;

  return new Dataloader(async (keys: number[]) => {
    const result = await knex('document_category').whereIn('parent_id', keys);
    return keys.map(key => result.filter(x => x.parent_id === key));
  });
}
