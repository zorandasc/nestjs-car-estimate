import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
//import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
//import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.imiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    /*
    {
      //GLOBAL INTRCEPTOR WHO EXSTRACT USER INFO FROM COOKIE USERID
      //WITH HELP OF USERSERVICE.FINDONE(USERID)
      //END ATACH USER OBJECT TO request.currentUser
      //COOKIE USERID IS ADDED DURING SIGNUP I SIGNIN
      //THIS request.currentUser CAN BE LATER USED BY DECORATORS AND GUARDS
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
      //THIS IS REPLACED WITH  MiddlewareConsumer DOWN IN CLASS
    },
    */
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
