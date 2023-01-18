import { ConfigModule } from '@nestjs/config/dist';
import { Environment } from './types/environment';
import { EnvironmentService } from './services/environment.service';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object<Environment, true>({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(8080),
        ENABLE_SWAGGER: Joi.boolean().default(true),
        MONGODB_URL: Joi.string().required(),
        MONGODB_DATABASE: Joi.string().required(),
      }),
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
