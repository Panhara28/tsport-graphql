import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateNewsStatusMutation = async (
  _,
  { id, status, websiteId }: { id: number; status: Graph.FilterNews; websiteId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const isUserCanUpdate = ctx.authUser.user.modified;

  if (isUserCanUpdate) {
    await knex
      .table('news')
      .update({
        status,
      })
      .where({ id })
      .andWhere('website_id', '=', websiteId);

    return true;
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
