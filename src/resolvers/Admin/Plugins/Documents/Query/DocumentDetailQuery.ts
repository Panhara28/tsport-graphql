import { AuthenticationError } from 'apollo-server';
import ContextType from 'src/graphql/ContextType';

export const DocumentDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const isRead = ctx.authUser.user.read;
  if (isRead) {
    const documentDetail = await knex
      .table('documents')
      .where({ id })
      .first();

    return {
      ...documentDetail,
    };
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
