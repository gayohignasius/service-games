require('dotenv').config();

const config = {
  development: {
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'testing',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

module.exports = config;
