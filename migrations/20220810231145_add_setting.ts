import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('settings'))) {
    return await knex.schema.createTable('settings', function(table) {
      table.increments();
      table.string('label');
      table.string('value');
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
