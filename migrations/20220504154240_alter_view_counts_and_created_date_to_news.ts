import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table('news', field => {
    field.dateTime('created_date');
    field.integer('view_counts').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {}
