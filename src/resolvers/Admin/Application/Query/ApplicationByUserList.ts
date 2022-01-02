import ContextType from 'src/graphql/ContextType';

export const ApplicationByUserList = (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const user_id = ctx.authUser.user.id;
  console.log(user_id);
};
