WHEN NEST APP START IT WILL USE typeorm.config.ts FILE TO CONNECT TO DATABASE:

LOCAL DEVELOPMENT
npm run start:dev
GENERATE MIGRATION FILE
npm run typeorm migration:generate src/migrations/initial-schema
RUN MIGRATION TO SQLITE DATA BASE
npm run typeorm migration:run

LOCAL TEST
npm run test:e2e
SYNCHRONIZE=true

LOCAL PRODUCTION
docker compose up (POSTGRES ON DOCKER)
npm run build
npm run start:prod
RUN MIGRATION TO POSTGRES
npm run typeorm:prod migration:generate src/migrations/initial-prod-schema
npm run typeorm:prod migration:run


WHEN RUNNING MIGRIATIONS WITH TYPEORM CLI COMMAND In package.json IT WILL USE data-source.ts
"typeorm": "cross-env NODE_ENV=development typeorm-ts-node-commonjs -d src/data-source.ts",

TO GENERATE MIGRATION USE:
npm run typeorm migration:generate src/migrations/initial-schema

we specified the name of the file initial-schema along with 
our intention to create a folder called 
migrations src/migrations/initial-schema


TO RUN MIGRATION:
npm run typeorm migration:run

Because of migration:[], field in data-source.ts.
TypeOrm cli will know how to run.



IN LOCAL POSTGRES PRODUCTION MODE USE:
npm run typeorm:prod migration:generate src/migrations/initial-prod-schema
npm run typeorm:prod migration:run



WHEN DEPLOYING TO PRODUCTION (RENDER, HEROKY), SPECIFY ENVIROMENT VARIABLES:

NODE_ENV=production
DB_TYPE=postgres
DATABASE_URL=postgres://12344567
MIGRATIONS_RUN=true
SYNCHRONIZE=false
COOKIE_KEY=12345
SSL=false
