import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('roles', function(table) {
    table.boolean('read').defaultTo(false);
    table.boolean('write').defaultTo(false);
    table.boolean('modify').defaultTo(false);
    table.boolean('delete').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {}
