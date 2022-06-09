import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateDocumentMutation = async (_, { input }: { input: Graph.DocumentInput }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const admin_id = ctx.authUser.user.id;
  const isCreated = ctx.authUser.user.write;

  if (isCreated) {
    const [createDocument] = await knex.table('documents').insert({
      title: input.title,
      document_category_id: input.document_category_id,
      document_category_sub_id: input.document_category_sub_id,
      file_url: input.file_url,
      website_id: 1,
      created_by: admin_id,
    });

    return createDocument;
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
