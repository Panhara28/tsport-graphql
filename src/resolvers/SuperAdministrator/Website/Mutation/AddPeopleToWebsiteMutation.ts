import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AddPeopleToWebsiteMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.UserInputId[] },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const checkIfThePeopleExisted = await knex
    .table('website_user_details')
    .whereIn(
      'user_id',
      input.map(item => item.userId),
    )
    .andWhere({ website_id: websiteId });

  if (checkIfThePeopleExisted.length > 0) {
    throw new AuthenticationError('User Already Existed');
  } else {
    input.map(async item => {
      await knex.table('website_user_details').insert({
        user_id: item.userId,
        website_id: websiteId,
      });
    });
  }

  if (checkIfThePeopleExisted.length > 0) {
    throw new AuthenticationError('User Already Existed');
  } else {
    return true;
  }
};
