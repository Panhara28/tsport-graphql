import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const ActivityLogsNewsQuery = async (
  _,
  { pagination, id }: { pagination: Graph.PaginationInput; id: number },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const query = knex
    .table('activity_log')
    .where({ news_id: id })
    .orderBy('id', 'desc');
  const totalQuery = knex.table('activity_log');

  if (pagination?.size !== undefined && pagination?.page !== undefined) {
    query.limit(pagination?.size).offset((pagination?.page - 1) * 10);
  }

  const data = await query;
  const total: any = await totalQuery.count('id as CNT');

  const users = await knex.table('users');

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
      size: pagination?.size,
    },
  };
};
