import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import NewsRepository from 'src/repository/NewsRepositoty';
import moment from 'moment';

export const CreateNewsMutation = async (
  _,
  { websiteId, input }: { websiteId: number; input: Graph.NewsInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isCreate = await ctx.authUser.user.write;

  if (isCreate) {
    const createNews = await new NewsRepository(knex).insert({
      title: input.title,
      description: JSON.stringify(input.description),
      summary: input.summary,
      thumbnail: input.thumbnail,
      new_category_id: input.new_category_id,
      created_by: 1,
      website_id: websiteId,
    });

    if (createNews) {
      await knex.table('activity_log').insert({
        user_id: ctx.authUser.user.id,
        type: 'NEWS',
        activity: JSON.stringify(
          `{'activityType': 'create_news', 'news_id': '${createNews}', 'logged_at': '${moment().format(
            'DD-MMM-YYYY HH:mm:ss',
          )}'}`,
        ),
        news_id: createNews,
        website_id: websiteId,
      });

      return createNews;
    } else {
      throw new AuthenticationError('Something went wrong');
    }
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
