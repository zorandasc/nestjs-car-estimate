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
        database: this.configService.get<string>('DB_NAME'),
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        //synhronize false
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
        ssl: {
          rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        },
      };
    }
  }
}
