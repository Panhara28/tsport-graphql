import ContextType from 'src/graphql/ContextType';

export const RemoveMediaMutation = async (
  _,
  { websiteId, mediaId, thumbnail }: { websiteId: number; mediaId: number; thumbnail: string },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const removeMedia = await knex
    .table('media')
    .del()
    .where('website_id', '=', websiteId)
    .andWhere('id', '=', mediaId);

  if (removeMedia > 0) {
    const removeNewsFeatureImage = await knex
      .table('news')
      .where('thumbnail', '=', thumbnail)
      .andWhere('website_id', '=', websiteId)
      .first();

    if (removeNewsFeatureImage) {
      await knex
        .table('news')
        .update({ thumbnail: null })
        .where('id', '=', removeNewsFeatureImage.id);
    }
  }

  return removeMedia > 0;
};
