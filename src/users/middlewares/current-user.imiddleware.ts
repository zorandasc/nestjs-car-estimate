import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

//OVO JE DA TS ZNA DA nAS EXPRES REQUEST OBJEKAT
//MOZE DA IMA CURRENTUSER PROPERTY
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //THIS IS ADDED BY COOKIE MIDLEWARE IN APPMODULE
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      req.currentUser = user;
    }
    next();
  }
}
