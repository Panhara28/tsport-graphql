import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const MediaListQuery = async (
  _,
  { websiteId, pagination }: { websiteId: number; pagination: Graph.PaginationInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const mediaList = await knex
    .table('media')
    .where('website_id', '=', websiteId)
    .orderBy('id', 'desc');

  return {
    data: mediaList.map(item => {
      return {
        ...item,
      };
    }),
    pagination: {
      total: mediaList.length,
      size: mediaList.length,
      current: pagination.page,
    },
  };
};
