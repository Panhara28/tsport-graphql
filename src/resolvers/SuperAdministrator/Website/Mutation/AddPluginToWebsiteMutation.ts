import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AddPluginToWebsiteMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.PluginInputId },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const checkIfThePluginExisted = await knex
    .table('website_plugins')
    .where('plugin_id', '=', input.pluginId)
    .andWhere('website_id', '=', websiteId)
    .first();

  if (checkIfThePluginExisted) {
    throw new AuthenticationError('Plugin Already Existed');
  }

  await knex.table('website_plugins').insert({
    website_id: websiteId,
    plugin_id: input.pluginId,
    isInstalled: 'INSTALLED',
  });

  return true;
};
