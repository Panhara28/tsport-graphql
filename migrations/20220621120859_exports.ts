import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('exports'))) {
    return await knex.schema.createTable('exports', table => {
      table.increments();
      table.string('name');
      table.integer('website_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}