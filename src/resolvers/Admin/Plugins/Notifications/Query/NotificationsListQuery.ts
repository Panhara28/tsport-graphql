import ContextType from 'src/graphql/ContextType';

export const NotificationsListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const notifications = await knex.table('notifications');

  return notifications;
};
