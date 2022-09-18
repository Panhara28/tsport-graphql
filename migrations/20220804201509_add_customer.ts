import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('customers'))) {
    return await knex.schema.createTable('customers', function(table) {
      table.increments();
      table.string('display');
      table.string('username');
      table.string('password');
      table.string('phone');
      table.string('address');
      table.string('login_token');
      table.enum('type', ['default', 'premium', 'hold_sale']).defaultTo('default');
      table.double('discount').defaultTo(0);
      table.timestamps(true, true);
      table.string('profile');
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
