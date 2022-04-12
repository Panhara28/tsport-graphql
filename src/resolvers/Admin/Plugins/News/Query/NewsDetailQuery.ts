import { AuthenticationError } from 'apollo-server';
import ContextType from 'src/graphql/ContextType';

export const NewsDetailQuery = async (_, { id, websiteId }: { id: number; websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isRead = await ctx.authUser.user.read;
  if (isRead) {
    const newsDetail = await knex
      .table('news')
      .where({ id })
      .andWhere('website_id', '=', websiteId)
      .first();

    return {
      ...newsDetail,
      description: newsDetail.description ? newsDetail.description : undefined,
    };
  } else {
    throw new AuthenticationError(`You don't have permission`);
  }
};
