import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user_plugins'))) {
    await knex.schema.createTable('user_plugins', table => {
      table.increments();
      table.integer('plugin_id');
      table.integer('user_id');
      table.boolean('read').defaultTo(false);
      table.boolean('write').defaultTo(false);
      table.boolean('modify').defaultTo(false);
      table.boolean('delete').defaultTo(false);
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
