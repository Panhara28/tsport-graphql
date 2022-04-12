import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import NewsRepository from 'src/repository/NewsRepositoty';

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

    return createNews;
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
