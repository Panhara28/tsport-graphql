import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AddPeopleToWebsiteMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.UserInputId[] },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  input.map(async item => {
    await knex.table('website_user_details').insert({
      user_id: item.userId,
      website_id: websiteId,
    });
  });

  return true;
};
