import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'development') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        //synhronize false
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
      };
    } else if (process.env.NODE_ENV === 'test') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        //synhronize true
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
      };
    } else if (process.env.NODE_ENV === 'production') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        //FOR LOCAL PRODUCTION DATABASE
        port: this.configService.get<any>('DB_PORT'),
        //FOR LOCAL PRODUCTION DATABASE
        host: this.configService.get<any>('DB_HOST'),
        //FOR LOCAL PRODUCTION DATABASE
        username: this.configService.get<any>('DB_USERNAME'),
        //FOR LOCAL PRODUCTION DATABASE
        password: this.configService.get<any>('DB_PASSWORD'),
        //FOR LOCAL PRODUCTION DATABASE
        database: this.configService.get<any>('DB_DATABASE'),
        //FOR REMOTE DATABASE USE URL
        //url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        //synhronize false
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
        //FOR REMOTE DATABASE
        // ssl: {
        ///  rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        //},
      };
    }
  }
}
