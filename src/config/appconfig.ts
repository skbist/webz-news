export default () => ({
  mode: process.env.MODE,
  port: process.env.PORT || 3080,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  },
});
