import ContextType from 'src/graphql/ContextType';

export async function CustomerListResolver(_: any, { offset, limit, phone }: any, ctx: ContextType) {
  const knex = ctx.knex.default;

  const query = knex.table('customers');

  if (phone) {
    query.whereRaw('phone_number LIKE :phone', { phone: '%' + phone + '%' });
  }

  const customers = await query
    .clone()
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy('created_at', 'desc');

  const { total } = await query
    .clone()
    .count('* as total')
    .first<{ total: number }>();

  return {
    data: customers.map(x => {
      return {
        ...x,
        fullname: x.display,
        discount: x.discount,
      };
    }),
    pagination: {
      total,
      current: offset + 1,
      size: customers.length,
    },
  };
}
