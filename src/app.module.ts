import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { User } from './users/entities/user.entity';
//import { Report } from './reports/entities/report.entity';
import { APP_PIPE } from '@nestjs/core';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    //3. APPROACH
    //FOR DEVELOPMENT, TESTING AND PRODUCTION
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    /*
    //2. APPROACH
    //FOR DEVELOMENT AND TESTING MODE
    //DA BI UBACILI CONFIG SSERVIS U TypeOrmModule
    //UMIJESTO FORROOT KORISTIMO FOORROOTASYNC
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        };
      },
    }),
*/
    /*
    1. APPROACH
    //ONLY FOR DEVELOPMENT
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    */
    ReportsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        //whitelistuje (skine) polja koja docu od korisnika ali nisu definisana u dto
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  //GLOBALY SCOPED MIDLEWARE
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
