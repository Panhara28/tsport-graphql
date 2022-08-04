import dotenv from 'dotenv';
dotenv.config();
console.log('from knex.ts', process.env.MYSQL_DEFAULT);

module.exports = {
  development: {
    client: 'mysql2',
    connection: process.env.MYSQL_DEFAULT,
    pool: { min: 2, max: 10 },
    migrations: {
      disableMigrationsListValidation: true,
      extension: 'ts',
    },
  },
};
