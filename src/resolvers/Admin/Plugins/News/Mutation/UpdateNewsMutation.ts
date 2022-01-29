import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateNewsMuation = async (
  _,
  { id, input, websiteId }: { id: number; input: Graph.NewsInput; websiteId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  await knex
    .table('news')
    .update({
      title: input.title,
      summary: input.summary,
      description: JSON.stringify(input.description),
      thumbnail: input.thumbnail ? input.thumbnail : '',
      new_category_id: input.new_category_id,
      updated_by: 1,
    })
    .where({ id })
    .andWhere('website_id', '=', websiteId);

  return true;
};
