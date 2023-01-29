
GENERATE MIGRATION:
we specified the name of the file initial-schema along with 
our intention to create a folder called 
migrations src/migrations/initial-schema

npm run typeorm migration:generate src/migrations/initial-schema


RUN MIGRAYTION WITH:
Because of migration:[], field in data-source.ts.
TypeOrm cli will know how to run.

npm run typeorm migration:run