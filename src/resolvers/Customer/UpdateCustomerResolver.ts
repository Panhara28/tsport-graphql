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
    display_name: data.fullname,
    email: data.email,
    phone_number: data.phone,
    permission: data.permission,
    address: data.address,
    special_discount: data.discount,
  });

  return customer ? true : false;
}
