import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateNewsCategoryMutation = async (
  _,
  { input }: { input: Graph.NewsCategoryInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const addNewsCategory = await knex.table('news_category').insert({
    name: input.name,
    created_by: 1,
  });
  return addNewsCategory[0];
};
