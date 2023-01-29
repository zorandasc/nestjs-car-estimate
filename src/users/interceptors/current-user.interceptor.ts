import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

//OVO SE VISE NE KORISTI PREBACENO NA USERMIDDLEVARE?????

//OUR CUSTOM INTERCEPTOR TO EXSTRACT LOGED IN USER FROM COOKIE
//OUR DECORATR ARE OUTSIDE OF DEPENDENY INJECTION SYSTEM
//SO TO GET INSTATNCE OF USERSERVICE WE NEED INTERCEPTORS
//THIS INTERCEPTOR IS ADDED GLOBALY IN USERMOULE
//SO OUR DECORATOR CAN LATER EXSTARTCT USER INFO FROM REQUEST
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      //THIS REQUEST WILL THEN BE POSIBLE EXTRTACT WITH PARAM DECORATOR LATER
      request.currentUser = user;
    }

    return handler.handle();
  }
}
