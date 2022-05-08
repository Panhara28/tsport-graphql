import ContextType from 'src/graphql/ContextType';

export const PushNotificationsMutation = async (
  _,
  { name, websiteId }: { name: string; websiteId: number },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  const pubsub = ctx.pubsub;
  const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newNotification';

  const [pushNotification] = await knex.table('notifications').insert({ name, website_id: websiteId });

  if (pushNotification) {
    pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { newNotification: { name } });

    return {
      name,
    };
  }
};
