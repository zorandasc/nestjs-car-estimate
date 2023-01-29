import { DataSource, DataSourceOptions } from 'typeorm';

//THIS FILE IS ONLY NEDED WHEN RUNNING TYPEORM CLI MIGRATION

let dataSourceOptions: DataSourceOptions;

const dataSourceOptionsSqlite: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
};

const dataSourceOptionsPostgres: DataSourceOptions = {
  type: 'postgres',
  port: 5432,
  database: 'nest',
  username: 'postgres',
  password: '123',
  entities: ['**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
};

if (process.env.NODE_ENV === 'development') {
  dataSourceOptions = dataSourceOptionsSqlite;
} else if (process.env.NODE_ENV === 'production') {
  dataSourceOptions = dataSourceOptionsPostgres;
}

export const appDataSource = new DataSource(dataSourceOptions);
