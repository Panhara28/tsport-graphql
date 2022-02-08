import ContextType from 'src/graphql/ContextType';

export const AddedPeopleListQuery = async (_, { websiteId }: { websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const addedPeople = await knex
    .table('users')
    .innerJoin('website_user_details', 'users.id', 'website_user_details.user_id')
    .innerJoin('websites', 'websites.id', 'website_user_details.website_id')
    .select('users.id as userId', 'users.fullname as fullName')
    .where('websites.id', '=', websiteId);

  return addedPeople.map(item => {
    return {
      userId: item.userId,
      fullName: item.fullName,
    };
  });
};
