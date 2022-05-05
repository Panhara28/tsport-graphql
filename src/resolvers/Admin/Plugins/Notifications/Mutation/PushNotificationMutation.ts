import ContextType from 'src/graphql/ContextType';

export const PushNotificationsMutation = async (
  _,
  { name, websiteId }: { name: string; websiteId: number },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const [pushNotification] = await knex.table('notifications').insert({ name, websiteId });

  return pushNotification;
};
