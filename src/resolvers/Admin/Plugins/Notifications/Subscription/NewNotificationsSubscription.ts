import ContextType from 'src/graphql/ContextType';

export const NewNotificationsSubscription = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newNotification';

  const pubsub = ctx.pubsub;

  return pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC);
};
