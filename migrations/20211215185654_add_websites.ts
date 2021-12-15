import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('websites'))) {
    return await knex.schema.createTable('websites', function(table) {
      table.increments();
      table.string('name');
      table.string('description');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
