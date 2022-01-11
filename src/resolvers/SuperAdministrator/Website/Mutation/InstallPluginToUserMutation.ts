import { AuthenticationError } from 'apollo-server';
import ContextType from 'src/graphql/ContextType';

export const InstallPluginToUserMutation = async (
  _,
  { websiteId, pluginId, userId }: { websiteId: number; pluginId: number; userId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const checkIfThePluginExisted = await knex
    .table('user_plugins')
    .where('plugin_id', '=', pluginId)
    .andWhere('user_id', '=', userId)
    .andWhere('website_id', '=', websiteId)
    .first();

  if (checkIfThePluginExisted) {
    throw new AuthenticationError('Plugin Already Existed');
  }

  await knex.table('user_plugins').insert({
    website_id: websiteId,
    plugin_id: pluginId,
    user_id: userId,
  });

  return true;
};
