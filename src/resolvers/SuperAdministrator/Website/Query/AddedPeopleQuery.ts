import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AddedPeopleListQuery = async (
  _,
  { websiteId, pagination }: { websiteId: number; pagination: Graph.PaginationInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const addedPeople = await knex
    .table('users')
    .innerJoin('website_user_details', 'users.id', 'website_user_details.user_id')
    .innerJoin('websites', 'websites.id', 'website_user_details.website_id')
    .select('users.id as userId', 'users.fullname as fullName')
    .where('websites.id', '=', websiteId);

  return {
    data: addedPeople.map(item => {
      return {
        userId: item.userId,
        fullName: item.fullName,
      };
    }),

    pagination: {
      current: pagination.page,
      size: addedPeople.length,
      total: addedPeople.length,
    },
  };
};
