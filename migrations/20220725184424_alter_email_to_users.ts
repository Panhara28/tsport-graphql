import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table('users', function(table) {
    table.string('email');
  });
}

export async function down(knex: Knex): Promise<void> {}
