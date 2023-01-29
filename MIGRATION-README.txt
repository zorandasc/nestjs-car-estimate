
GENERATE MIGRATION:
we specified the name of the file initial-schema along with 
our intention to create a folder called 
migrations src/migrations/initial-schema

npm run typeorm migration:generate src/migrations/initial-schema


RUN MIGRAYTION WITH:
Because of migration:[], field in data-source.ts.
TypeOrm cli will know how to run.

npm run typeorm migration:run


WHEN DEPLOYING TO PRODUCTION, SPECIFY ENVIROMENT VARIABLES:

NODE_ENV=production
DB_TYPE=postgres
DATABASE_URL=postgres://12344567
MIGRATIONS_RUN=true
SYNCHRONIZE=false
COOKIE_KEY=12345
SSL=false
