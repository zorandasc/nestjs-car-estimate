import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

//THIS MEANS ANY CLASS CAN DOO, OUR CUSTOM TYPE CHACKER
interface ClassConstructor {
  new (...args: any[]): unknown;
}

//THIS IS OUR CUSTOM DECORATOR WHICH WRAP OUR CUSTOM INTERCEPTOR
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

//THIS IS OUR CUSTOM INTERCEPTOR THAT
//converT UserEntity response to OutpuUserdto(without password)
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    nextHandler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //RUN CODE BEFORE HANDLED BY REQUEST HANDLER
    //console.log('I AM RUNNING BEFIORE REQUEST HANDLER', context);
    return nextHandler.handle().pipe(
      map((data: any) => {
        //RUN SOMETHING BEFORE RESPONSE
        //console.log('I AM RUNNING BEFIORE RESPONSE HANDLER', data);
        //this conver Entity object (UserEntity, ReportEntity)
        //to OutpuDto (UserDto without password), ReportDto
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
