import { AuthenticationError } from 'apollo-server';
import { ChildrenCategory } from 'src/dataloader/childrenCategory';
import ContextType from 'src/graphql/ContextType';

export const DocumentCategoryDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const isRead = await ctx.authUser.user.read;
  if (isRead) {
    const documentCategoryDetail = await knex('document_category')
      .where({ id })
      .first();

    const layerOne = ChildrenCategory(ctx);

    return {
      ...documentCategoryDetail,
      layerOne: layerOne.load(documentCategoryDetail.id),
    };
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
