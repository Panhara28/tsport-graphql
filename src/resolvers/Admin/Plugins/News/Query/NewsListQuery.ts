import { AuthenticationError } from 'apollo-server';
import { toKhmerFormat } from 'src/function/toKhmerFormat';
import { Graph } from 'src/generated/graph';
import { table_news } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export const NewsListQuery = async (
  _,
  { filter, pagination, websiteId }: { filter: Graph.FilterNews; pagination: Graph.PaginationInput; websiteId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isRead = await ctx.authUser.user.read;
  if (isRead) {
    const query = knex
      .table('news')
      .orderBy('id', 'desc')
      .where('website_id', '=', websiteId);
    const totalQuery = knex.table('news');

    if (filter?.status != undefined) {
      query.andWhere({ status: filter.status });
      totalQuery.andWhere({ status: filter.status });
    }

    if (filter?.name) {
      query.andWhere('title', 'like', `%${filter?.name}%`);
    }

    if (pagination.size != undefined && pagination.page != undefined) {
      query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
    }

    const data: table_news[] = await query;
    const total: {} = await totalQuery.count('id as CNT');
    let newData: table_news[];

    if (filter?.id !== undefined) {
      const regex = new RegExp(`^${filter.id + ''}`, 'i');
      newData = data.sort().filter(val => regex.test(val.id + ''));
    } else {
      newData = data;
    }

    return {
      data: newData.map(item => {
        return {
          ...item,
          created_date: toKhmerFormat(item.created_date),
        };
      }),
      pagination: {
        total: Number(total[0].CNT),
        size: data.length,
        current: pagination.page,
      },
    };
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
