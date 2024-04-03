import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/videos/entities/video.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        Logger.log(`ENV: ${config.get('NEST_ENV')}`, 'TypeOrmModule', true);
        return {
          type: 'postgres',
          host: config.get<string>('POSTGRES_HOST'),
          port: parseInt(config.get('POSTGRES_PORT')),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [Video],
          migrationsTableName: 'migration',
          migrations: ['../src/migration/*.ts'],
          cli: {
            migrationsDir: '../src/migration',
          },
          ssl: false,
          // logging: ['query', 'error'], // ['error', 'warn', 'info', 'log', 'query', 'schema']
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeormConfigModule {}
