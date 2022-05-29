import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import DateHelper from 'src/function/DateHelper';

export const UpdateNewsMuation = async (
  _,
  { id, input, websiteId }: { id: number; input: Graph.NewsInput; websiteId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isUpdated = await ctx.authUser.user.modified;
  console.log('input.published_date', input.published_date);
  console.log('connvert', moment(input.published_date).format('YYYY-MM-DD HH:mm:ss'));
  const date = input.published_date
    ? moment(input.published_date)
        .tz('Asia/Phnom_Penh')
        .format('YYYY-MM-DD HH:mm:ss')
    : moment()
        .tz('Asia/Phnom_Penh')
        .format('YYYY-MM-DD HH:mm:ss');
  console.log('date', date);

  if (isUpdated) {
    const updateNews = await knex
      .table('news')
      .update({
        title: input.title,
        summary: input.summary,
        description: JSON.stringify(input.description),
        thumbnail: input.thumbnail ? input.thumbnail : '',
        new_category_id: input.new_category_id,
        published_date: moment(input.published_date).format('YYYY-MM-DD HH:mm:ss'),
        updated_by: ctx.authUser.user.id,
      })
      .where({ id })
      .andWhere('website_id', '=', websiteId);

    if (updateNews) {
      await knex.table('activity_log').insert({
        user_id: ctx.authUser.user.id,
        type: 'NEWS',
        activity: JSON.stringify(
          `{'activityType': 'edit_news', 'news_id': '${id}', 'logged_at': '${moment().format(
            'DD-MMM-YYYY HH:mm:ss',
          )}'}`,
        ),
        news_id: id,
        website_id: websiteId,
      });
      return true;
    } else {
      throw new AuthenticationError('Something went wrong');
    }
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
