import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import moment from 'moment';

export const UpdateNewsStatusMutation = async (
  _,
  { id, status, websiteId }: { id: number; status: Graph.FilterNews; websiteId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const isUserCanUpdate = ctx.authUser.user.modified;

  if (isUserCanUpdate) {
    const updateStatus = await knex
      .table('news')
      .update({
        status,
      })
      .where({ id })
      .andWhere('website_id', '=', websiteId);

    const newsDetail = await knex
      .table('news')
      .where({ id })
      .andWhere('website_id', '=', websiteId)
      .first();

    if (newsDetail?.status === 'PUBLISHED') {
      console.log(moment().format('YYYY-mm-DD HH:mm:ss'));

      const updatePublishedDate = await knex
        .table('news')
        .update({
          published_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .where({ id })
        .andWhere('website_id', '=', websiteId);

      console.log(updatePublishedDate);
    }

    if (updateStatus) {
      await knex.table('activity_log').insert({
        user_id: ctx.authUser.user.id,
        type: 'NEWS',
        activity: JSON.stringify(
          `{'activityType': 'edit_status', 'news_id': '${id}', 'changeStatus': '${status}', 'logged_at': '${moment().format(
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