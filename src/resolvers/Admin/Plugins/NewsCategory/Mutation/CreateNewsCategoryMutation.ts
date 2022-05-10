import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateNewsCategoryMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.NewsCategoryInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const addNewsCategory = await knex.table('news_category').insert({
    name: input.name,
    created_by: 1,
    website_id: websiteId,
  });
  return addNewsCategory[0];
};
