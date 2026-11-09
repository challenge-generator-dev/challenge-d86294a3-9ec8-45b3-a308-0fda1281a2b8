import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export interface DatabaseConfig {
  sql: TypeOrmModuleOptions;
  nosql: MongooseModuleFactoryOptions;
}

@Injectable()
export class DatabaseConfigService {
  private readonly logger = new Logger(DatabaseConfigService.name);

  constructor(private readonly configService: ConfigService) {}

  getSqlConfig(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.get<string>('DB_SQL_HOST', 'localhost'),
      port: this.configService.get<number>('DB_SQL_PORT', 5432),
      username: this.configService.get<string>('DB_SQL_USERNAME', 'postgres'),
      password: this.configService.get<string>('DB_SQL_PASSWORD', 'postgres'),
      database: this.configService.get<string>('DB_SQL_DATABASE', 'inventory'),
      entities: [__dirname + '/../../domain/**/*.entity{.ts,.js}'],
      synchronize: this.configService.get<boolean>('DB_SQL_SYNCHRONIZE', false),
      logging: this.configService.get<boolean>('DB_SQL_LOGGING', false),
      ssl: this.configService.get<boolean>('DB_SQL_SSL', false)
        ? { rejectUnauthorized: false }
        : false,
      extra: {
        connectionLimit: this.configService.get<number>('DB_SQL_POOL_SIZE', 10),
        idleTimeoutMillis: this.configService.get<number>('DB_SQL_IDLE_TIMEOUT', 30000),
        max: this.configService.get<number>('DB_SQL_MAX_CONNECTIONS', 20),
      },
    };

    this.logger.log(`SQL Database configured: ${config.host}:${config.port}/${config.database}`);
    return config;
  }

  getNoSqlConfig(): MongooseModuleFactoryOptions {
    const config: MongooseModuleFactoryOptions = {
      uri: `mongodb://${this.configService.get<string>('DB_NOSQL_HOST', 'localhost')}:${this.configService.get<number>('DB_NOSQL_PORT', 27017)}/${this.configService.get<string>('DB_NOSQL_DATABASE', 'inventory_nosql')}`,
      dbName: this.configService.get<string>('DB_NOSQL_DATABASE', 'inventory_nosql'),
      user: this.configService.get<string>('DB_NOSQL_USERNAME'),
      pass: this.configService.get<string>('DB_NOSQL_PASSWORD'),
      serverSelectionTimeoutMS: this.configService.get<number>('DB_NOSQL_TIMEOUT', 5000),
      socketTimeoutMS: this.configService.get<number>('DB_NOSQL_SOCKET_TIMEOUT', 45000),
      maxPoolSize: this.configService.get<number>('DB_NOSQL_POOL_SIZE', 10),
      minPoolSize: this.configService.get<number>('DB_NOSQL_MIN_POOL_SIZE', 2),
      appName: 'inventory-api',
    };

    this.logger.log(`NoSQL Database configured: ${config.uri}`);
    return config;
  }

  getDatabaseConfig(): DatabaseConfig {
    return {
      sql: this.getSqlConfig(),
      nosql: this.getNoSqlConfig(),
    };
  }
}

export const databaseConfigFactory = {
  provide: 'DATABASE_CONFIG',
  useFactory: (configService: ConfigService): DatabaseConfig => {
    const service = new DatabaseConfigService(configService);
    return service.getDatabaseConfig();
  },
  inject: [ConfigService],
};