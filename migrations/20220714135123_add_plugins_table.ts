import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('plugins'))) {
    await knex.schema.createTable('plugins', table => {
      table.increments();
      table.string('name');
      table.string('slug');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
