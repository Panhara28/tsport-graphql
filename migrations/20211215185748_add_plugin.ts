import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('plugins'))) {
    return await knex.schema.createTable('plugins', function(table) {
      table.increments();
      table.string('name');
      table.string('slug');
      table.integer('website_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
