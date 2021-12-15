import knex from 'knex';

export default function createKnexContex() {
  return {
    default: knex({
      client: 'mysql2',
      connection: process.env.MYSQL_DEFAULT,
      pool: { min: 3, max: 10 },
    }),
  };
}
