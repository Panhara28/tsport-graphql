import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table('news', field => {
    field.boolean('is_notify').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {}
