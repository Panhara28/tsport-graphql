import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user_token'))) {
    return await knex.schema.createTable('user_token', function(table) {
      table.increments();
      table.integer('super_admin_id');
      table.text('token', 'longtext');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
