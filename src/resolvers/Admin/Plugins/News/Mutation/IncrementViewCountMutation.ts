import ContextType from 'src/graphql/ContextType';

export const IncrementViewCountMutation = async (
  _,
  { id, websiteId }: { id: number; websiteId: number },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const news = await knex
    .table('news')
    .where({ id: id, website_id: websiteId })
    .first();

  const incrementViewCount = await knex
    .table('news')
    .update({ view_counts: Number(news?.view_counts) })
    .where({ id: id, website_id: websiteId });

  if (incrementViewCount) {
    return true;
  } else {
    return false;
  }
};
