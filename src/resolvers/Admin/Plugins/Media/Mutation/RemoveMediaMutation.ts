import ContextType from 'src/graphql/ContextType';

export const RemoveMediaMutation = async (
  _,
  { websiteId, mediaId, newsId }: { websiteId: number; mediaId: number; newsId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const removeMedia = await knex
    .table('media')
    .del()
    .where('website_id', '=', websiteId)
    .andWhere('id', '=', mediaId);
  return removeMedia > 0;
};
