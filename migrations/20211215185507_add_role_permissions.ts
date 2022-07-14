import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('role_permissions'))) {
    return await knex.schema.createTable('role_permissions', function(table) {
      table.increments();
      table.integer('user_id');
      table.integer('role_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
