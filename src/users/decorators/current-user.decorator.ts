import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//OUR CUSTOM PARAM DECORATOR TO EXSTRACT LOGED IN USER FROM COOKIE
//DECORATR ARE OUTSIDE OF DEPENDENY INJECTION SYSTEM
//SO TO GET INSTATNCE OF USERSERVIDE WE NEED INTERCEPTORS
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    //request.currentUser is set by our CurrentUserInterceptor GLOBALY;
    return request.currentUser;
  },
);
