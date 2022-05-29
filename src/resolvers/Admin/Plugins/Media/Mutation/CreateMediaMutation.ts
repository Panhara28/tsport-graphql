import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateMediaMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.MediaInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  // await ctx.authUser.requireLogin('USER');
  // const isWrite = await ctx.authUser.user.write;
  // const admin_id = await ctx.authUser.user.id;

  // if (isWrite) {
  //   const [createMedia] = await knex.table('media').insert({
  //     image_url: input.image_url,
  //     upload_storage: input.upload_storage,
  //     mimetype: input.mimetype,
  //     width: input.width,
  //     height: input.height,
  //     website_id: websiteId,
  //     created_by: admin_id,
  //     updated_by: admin_id,
  //   });

  //   return createMedia;
  // } else {
  //   throw new AuthenticationError(`You don't have permission`);
  // }

  const [createMedia] = await knex.table('media').insert({
    image_url: input.image_url,
    upload_storage: input.upload_storage,
    mimetype: input.mimetype,
    width: input.width,
    height: input.height,
    website_id: websiteId,
    created_by: 1,
    updated_by: 1,
  });

  return createMedia;
};
