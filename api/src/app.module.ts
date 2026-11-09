import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product.sql.repository';
import { ProductRepository } from './domain/repositories/product.repository';
import { databaseConfigFactory } from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_SQL_HOST', 'localhost'),
          port: configService.get<number>('DB_SQL_PORT', 5432),
          username: configService.get<string>('DB_SQL_USERNAME', 'postgres'),
          password: configService.get<string>('DB_SQL_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_SQL_DATABASE', 'inventory'),
          entities: [__dirname + '/domain/**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DB_SQL_SYNCHRONIZE', false),
          logging: configService.get<boolean>('DB_SQL_LOGGING', false),
          ssl: configService.get<boolean>('DB_SQL_SSL', false)
            ? { rejectUnauthorized: false }
            : false,
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_NOSQL_HOST', 'localhost');
        const port = configService.get<number>('DB_NOSQL_PORT', 27017);
        const database = configService.get<string>('DB_NOSQL_DATABASE', 'inventory_nosql');
        const username = configService.get<string>('DB_NOSQL_USERNAME');
        const password = configService.get<string>('DB_NOSQL_PASSWORD');

        let uri = `mongodb://${host}:${port}/${database}`;
        if (username && password) {
          uri = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${database}?authSource=admin`;
        }

        return {
          uri,
          dbName: database,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          maxPoolSize: 10,
          minPoolSize: 2,
          appName: 'inventory-api',
        };
      },
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: ProductSqlRepository,
    },
  ],
})
export class AppModule {}