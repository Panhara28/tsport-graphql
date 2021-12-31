import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('super_admin'))) {
    return await knex.schema.createTable('super_admin', function(table) {
      table.increments();
      table.string('username');
      table.string('password');
      table.string('fullname');
      table.integer('created_by');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
