import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('banners'))) {
    return await knex.schema.createTable('banners', function(table) {
      table.increments();
      table.string('name');
      table.string('image');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
