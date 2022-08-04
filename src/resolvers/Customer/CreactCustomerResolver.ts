import { Graph } from 'src/generated/graph';
import { table_customers } from 'src/generated/tables/table_customers';
import ContextType from 'src/graphql/ContextType';
import md5 from 'md5';
import { ApolloError } from 'apollo-server';

export async function CreateCustomerResolver(_, { data }, ctx: ContextType): Promise<boolean> {
  const knex = ctx.knex.default;

  const getCustomer = await knex
    .table('customers')
    .where({ phone: data.phone })
    .first();

  if (getCustomer) {
    throw new ApolloError('Phone number are already register.');
  }

  await knex.table<table_customers>('customers').insert({
    display: data.fullname,
    username: data.username,
    password: md5(data.password),
    phone: data.phone,
    address: data.address,
    type: data.type,
    discount: data.discount,
    login_token: md5(data.username + new Date()),
    profile: data.profile,
  });

  return true;
}
