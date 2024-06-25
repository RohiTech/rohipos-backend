const { Pool } = require('pg');

module.exports = {
  pool: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rohipos',
    password: 'postgres',
    port: 5432, // Puerto por defecto de PostgreSQL
    ssl: false, // Cambia esto a true si estás usando SSL
  }),
};