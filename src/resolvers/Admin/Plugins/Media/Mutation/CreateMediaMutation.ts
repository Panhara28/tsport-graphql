import ContextType from 'src/graphql/ContextType';

export const CreateMediaMutation = (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;
};
