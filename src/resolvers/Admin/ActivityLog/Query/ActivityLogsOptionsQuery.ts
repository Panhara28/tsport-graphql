import ContextType from 'src/graphql/ContextType';

export const ActivityLogsOptionsQuery = async (_, { websiteId }: { websiteId: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const options = await knex
    .table('activity_log')
    .andWhere({ website_id: websiteId })
    .select('type')
    .distinct();

  return [{ type: 'ALL' }, ...options];
};
