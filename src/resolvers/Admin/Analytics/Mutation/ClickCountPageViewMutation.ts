import ContextType from 'src/graphql/ContextType';

export const ClickCountPageViewMutation = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const newsDetail = await knex
    .table('news')
    .where({ id })
    .first();

  if (newsDetail) {
    const pageViewCount = (newsDetail.pageview += 1);

    await knex
      .table('news')
      .update({
        pageview: pageViewCount,
      })
      .where({ id: newsDetail.id });

    return true;
  } else {
    return false;
  }
};
