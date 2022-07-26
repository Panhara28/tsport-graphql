import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const ActivityLogsListQuery = async (
  _,
  { filter, pagination }: { filter: Graph.FilterActivityLogs; pagination: Graph.PaginationInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const query = knex.table('activity_log').orderBy('id', 'desc');
  const totalQuery = knex.table('activity_log');

  if (pagination?.page !== undefined && pagination?.size !== undefined) {
    query.limit(pagination?.size).offset((pagination?.page - 1) * pagination?.size);
  }

  if (filter?.type !== undefined) {
    query.andWhere({ type: filter?.type });
    totalQuery.andWhere({ type: filter?.type });
  }

  const users = await knex.table('users');

  const data = await query;
  const total: any = await totalQuery.count('id as CNT');

  return {
    data: data.map(item => {
      const user = users.find(x => x.id === item.user_id);

      return {
        ...item,
        user,
      };
    }),
    pagination: {
      total: Number(total[0].CNT),
      current: pagination?.page,
      size: data.length,
    },
  };
};
