import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isPoduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isPoduction,
          extra: {
            ssl: isPoduction ? { rejectUnauthorized: false } : null,
          },
          type: 'mariadb',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST') || 'localhost',
          port: configService.get('DB_PORT') || 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
