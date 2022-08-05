import ContextType from 'src/graphql/ContextType';

export async function UpdateCustomerResolver(_: any, { id, data }: any, ctx: ContextType): Promise<boolean> {
  const knex = ctx.knex.default;
  const user = ctx.authCustomer;

  const query = knex.table('customers');

  if (user) {
    query.where({ id: user.id });
  } else {
    query.where({ id });
  }

  const customer = await query.clone().update({
    display: data.fullname,
    phone: data.phone,
    type: data.type,
    address: data.address,
    discount: data.discount,
    profile: data.profile,
  });

  return customer ? true : false;
}
