import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('website_plugins'))) {
    return await knex.schema.createTable('website_plugins', function(table) {
      table.increments();
      table.integer('website_id');
      table.integer('plugin_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
