import { AuthenticationError } from 'apollo-server-errors';
import ContextType from 'src/graphql/ContextType';

export const RemovePeopleFromWebsiteMutation = async (
  _,
  { userId, websiteId }: { userId: number; websiteId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  if (!websiteId && !userId) {
    throw new AuthenticationError('Something went wrong');
  }
  const removePeople = await knex
    .table('website_user_details')
    .del()
    .where('website_user_details.user_id', '=', userId)
    .andWhere('website_user_details.website_id', '=', websiteId);

  return removePeople;
};
