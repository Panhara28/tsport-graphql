import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user_plugins'))) {
    return await knex.schema.createTable('user_plugins', function(table) {
      table.increments();
      table.integer('website_id');
      table.integer('plugin_id');
      table.integer('user_id');
      table.boolean('read').defaultTo(false);
      table.boolean('display').defaultTo(false);
      table.boolean('write').defaultTo(false);
      table.boolean('remove').defaultTo(false);
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
