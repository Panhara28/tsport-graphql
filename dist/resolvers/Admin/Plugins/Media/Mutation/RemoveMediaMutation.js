"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveMediaMutation = void 0;

const RemoveMediaMutation = async (_, {
  websiteId,
  mediaId,
  thumbnail
}, ctx) => {
  const knex = ctx.knex.default;
  const removeMedia = await knex.table('media').del().where('website_id', '=', websiteId).andWhere('id', '=', mediaId);

  if (removeMedia > 0) {
    const removeNewsFeatureImage = await knex.table('news').where('thumbnail', '=', thumbnail).andWhere('website_id', '=', websiteId);

    if (removeNewsFeatureImage) {
      await knex.table('news').update({
        thumbnail: null
      }).whereIn('id', removeNewsFeatureImage.map(item => item.id));
    }
  }

  return removeMedia > 0;
};

exports.RemoveMediaMutation = RemoveMediaMutation;