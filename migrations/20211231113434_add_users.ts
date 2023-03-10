import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    return await knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username');
      table.string('password');
      table.string('fullname');
      table.integer('created_by');
      table.integer('phone_number');
      table.string('profile_picture');
      table.enum('type', ['SUPER_ADMIN', 'ADMIN']).defaultTo('ADMIN');
      table.timestamps(true, true);
      table.boolean('published').defaultTo(true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
