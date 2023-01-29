//import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  OVO PREBACILI U APP MODULE ZBOG IMPLEMENTACIJE PROCESA TESTIRANJA
  POSTO SE TADA MAIN.TS NE REALIZUJE
  app.use(
    cookieSession({
      keys: ['123456789'],
    }),
  );
 
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelistuje (skine) polja koja docu od korisnika ali nisu definisana u dto
      whitelist: true,
    }),
  );
  */
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
