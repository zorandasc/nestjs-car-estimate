import { DataSource, DataSourceOptions } from 'typeorm';

//THIS FILE IS ONLY NEDED WHEN RUNNING TYPEORM CLI MIGRATION
const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity{.js,.ts}'],
  //FIRST MIGREATIOM WILL BE GENERATED WITH
  //npm run typeorm migration:generate src/migrations/initial-schema
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  //BECSUSE OF THIS FIELD TypeOrm cli will THEN know where to
  //look for migrations WHEN RUNNING
  //npm run typeorm migration:run
};

export const appDataSource = new DataSource(dataSourceOptions);
