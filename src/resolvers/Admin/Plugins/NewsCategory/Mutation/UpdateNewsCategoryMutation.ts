import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateNewsCategoryMutation = async (
  _,
  { websiteId, id, input }: { websiteId: number; id: number; input: Graph.NewsCategoryInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const updateNewsCategory = await knex
    .table('news_category')
    .update({
      name: input.name,
    })
    .where({ id })
    .andWhere('website_id', '=', websiteId);

  return updateNewsCategory > 0;
};
