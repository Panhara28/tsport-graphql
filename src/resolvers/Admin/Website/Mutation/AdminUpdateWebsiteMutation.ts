import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AdminUpdateWebsiteMutation = async (
  _,
  { id, input }: { id: number; input: Graph.WebsiteInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  // await ctx.authUser.requireLogin('USER');

  const updateWebsite = await knex
    .table('websites')
    .update({
      name: input.name,
      description: input.description,
      website_logo: input.website_logo,
      facebook_link: input.facebook_link,
      telegram_link: input.telegram_link,
    })
    .where({ id });

  return updateWebsite > 0;
};
