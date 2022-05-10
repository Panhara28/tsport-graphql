"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateMediaMutation = void 0;

var _apolloServer = require("apollo-server");

const CreateMediaMutation = async (_, {
  websiteId,
  input
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isWrite = await ctx.authUser.user.write;
  const admin_id = await ctx.authUser.user.id;

  if (isWrite) {
    const [createMedia] = await knex.table('media').insert({
      image_url: input.image_url,
      upload_storage: input.upload_storage,
      mimetype: input.mimetype,
      width: input.width,
      height: input.height,
      website_id: websiteId,
      created_by: admin_id,
      updated_by: admin_id
    });
    return createMedia;
  } else {
    throw new _apolloServer.AuthenticationError(`You don't have permission`);
  }
};

exports.CreateMediaMutation = CreateMediaMutation;