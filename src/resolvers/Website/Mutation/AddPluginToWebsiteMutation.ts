import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AddPluginToWebsiteMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.PluginInputId[] },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  input.map(async item => {
    await knex.table('website_plugins').insert({
      website_id: websiteId,
      plugin_id: item.pluginId,
    });
  });

  return true;
};
