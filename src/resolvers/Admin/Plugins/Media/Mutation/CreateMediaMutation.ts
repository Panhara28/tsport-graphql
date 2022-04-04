import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateMediaMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.MediaInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  // await ctx.authSuperAdmin.requireLogin('USER');
  console.log(websiteId);

  const [createMedia] = await knex.table('media').insert({
    image_url: input.image_url,
    website_id: websiteId,
  });

  return createMedia;
};
