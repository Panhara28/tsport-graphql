import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('playground'))) {
    return await knex.schema.createTable('playground', function(table) {
      table.increments();
      table.string('title');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
