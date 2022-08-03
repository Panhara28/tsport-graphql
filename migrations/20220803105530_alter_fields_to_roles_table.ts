import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table('roles', function(table) {
    table.boolean('generalDepartmentRead').defaultTo(false);
    table.boolean('generalDepartmentWrite').defaultTo(false);
    table.boolean('generalDepartmentModify').defaultTo(false);
    table.boolean('generalDepartmentRemove').defaultTo(false);
    table.boolean('departmentRead').defaultTo(false);
    table.boolean('departmentWrite').defaultTo(false);
    table.boolean('departmentModify').defaultTo(false);
    table.boolean('departmentRemove').defaultTo(false);
    table.boolean('officeRead').defaultTo(false);
    table.boolean('officeWrite').defaultTo(false);
    table.boolean('officeModify').defaultTo(false);
    table.boolean('officeRemove').defaultTo(false);
    table.boolean('officerRead').defaultTo(false);
    table.boolean('officerWrite').defaultTo(false);
    table.boolean('officerModify').defaultTo(false);
    table.boolean('officerRemove').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {}
