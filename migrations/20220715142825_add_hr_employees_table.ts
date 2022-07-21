import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('hr_employees'))) {
    return await knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS \`hr_employees\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
      \`username\` varchar(255) DEFAULT NULL,
      \`password\` varchar(255) DEFAULT NULL,
      \`fullname\` varchar(255) DEFAULT NULL,
      \`profile\` varchar(255) DEFAULT NULL,
      \`created_by\` int(11) DEFAULT NULL,
      \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`status\` tinyint(1) DEFAULT '0',
      \`phoneNumber\` varchar(255) DEFAULT NULL,
      \`email\` varchar(255) DEFAULT NULL,
      \`gender\` varchar(255) DEFAULT NULL,
      \`nationality\` varchar(255) DEFAULT NULL,
      \`dob\` varchar(255) DEFAULT NULL,
      \`district\` varchar(255) DEFAULT NULL,
      \`commune\` varchar(255) DEFAULT NULL,
      \`province\` varchar(255) DEFAULT NULL,
      \`education_level\` varchar(255) DEFAULT NULL,
      \`passport_id\` varchar(255) DEFAULT NULL,
      \`national_id\` varchar(255) DEFAULT NULL,
      \`position_description\` varchar(255) DEFAULT NULL,
      \`position_level\` varchar(255) DEFAULT NULL,
      \`unit\` varchar(255) DEFAULT NULL,
      \`department_id\` int(11) DEFAULT NULL,
      \`homeNo\` varchar(255) DEFAULT NULL,
      \`streetNo\` varchar(255) DEFAULT NULL,
      \`village_or_group\` varchar(255) DEFAULT NULL,
      \`contact_district\` varchar(255) DEFAULT NULL,
      \`contact_commune\` varchar(255) DEFAULT NULL,
      \`contact_city_or_province\` varchar(255) DEFAULT NULL,
      \`fullname_en\` varchar(255) DEFAULT NULL,
      \`contact_village\` varchar(255) DEFAULT NULL,
      \`general_department_id\` int(11) DEFAULT NULL,
      \`office_id\` int(11) DEFAULT NULL,
      \`officer_id\` varchar(255) DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    )`);
  }
}

export async function down(knex: Knex): Promise<void> {}
