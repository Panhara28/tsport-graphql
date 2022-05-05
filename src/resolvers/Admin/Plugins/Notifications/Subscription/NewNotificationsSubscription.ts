import ContextType from 'src/graphql/ContextType';
import { PubSub } from 'graphql-subscriptions';

export const NewNotificationsSubscription = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const notification_subscription_topic = 'newNotification';

  const pubsub = new PubSub();

  return pubsub.asyncIterator(notification_subscription_topic);
};
