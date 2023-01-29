import { rm } from 'fs/promises';
import { join } from 'path';

//DELETE TEST DB SQLITE ON EVERY TEST RUNING
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'db-test.sqlite'));
  } catch (error) {}
});
