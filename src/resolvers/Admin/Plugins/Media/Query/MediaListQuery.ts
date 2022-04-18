import moment from 'moment';
import { MediaUserLoader } from 'src/dataloader/mediaUserLoader';
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

  const mediaUser = MediaUserLoader(ctx);

  return {
    data: mediaList.map(item => {
      return {
        ...item,
        created_at: moment(item.created_at).format('DD MMMM, YYYY'),
        user: mediaUser.load(item.created_by),
      };
    }),
    pagination: {
      total: mediaList.length,
      size: mediaList.length,
      current: pagination.page,
    },
  };
};
