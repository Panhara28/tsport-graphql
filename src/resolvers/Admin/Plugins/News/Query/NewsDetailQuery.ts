import { AuthenticationError } from 'apollo-server';
import { toKhmerFormat } from 'src/function/toKhmerFormat';
import ContextType from 'src/graphql/ContextType';

export const NewsDetailQuery = async (_, { id, websiteId }: { id: number; websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const newsDetail = await knex
    .table('news')
    .where({ id })
    .andWhere('website_id', '=', websiteId)
    .first();

  return {
    ...newsDetail,
    // created_date: toKhmerFormat(newsDetail?.created_date),
    published_date: newsDetail?.published_date ? newsDetail?.published_date : undefined,
    description: newsDetail.description ? newsDetail.description : undefined,
  };
  // const isRead = await ctx.authUser.user.read;
  // if (isRead) {
  //   const newsDetail = await knex
  //     .table('news')
  //     .where({ id })
  //     .andWhere('website_id', '=', websiteId)
  //     .first();

  //   return {
  //     ...newsDetail,
  //     // created_date: toKhmerFormat(newsDetail?.created_date),
  //     published_date: newsDetail?.published_date ? toKhmerFormat(newsDetail?.published_date) : undefined,
  //     description: newsDetail.description ? newsDetail.description : undefined,
  //   };
  // } else {
  //   throw new AuthenticationError(`You don't have permission`);
  // }
};
