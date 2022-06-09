import { AuthenticationError } from 'apollo-server';
import moment from 'moment';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateDocumentMutation = async (
  _,
  { id, input }: { id: number; input: Graph.DocumentInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const admin_id = ctx.authUser.user.id;
  const isUpdated = ctx.authUser.user.modified;

  if (isUpdated) {
    const updateDocument = await knex
      .table('documents')
      .update({
        title: input.title,
        document_category_id: input.document_category_id,
        document_category_sub_id: input.document_category_sub_id,
        file_url: input.file_url,
        website_id: 1,
        published_date: moment(input.published_date).format('YYYY-MM-DD HH:mm:ss'),
        updated_by: admin_id,
      })
      .where({ id });

    return updateDocument > 0;
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
