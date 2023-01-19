import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { DatabaseService } from './core/database';
import { EnvironmentModule, EnvironmentService } from './core/environment';
import { Tenant, TenantSchema } from './schemas/tenant.schema';
import { SignUpService } from './sign-up/sign-up.service';

@Module({
  imports: [
    EnvironmentModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentModule],
      useClass: DatabaseService,
      inject: [EnvironmentService]
    }),
    MongooseModule.forFeature([
      {
        name: Tenant.name,
        schema: TenantSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    DatabaseService,
    SignUpService,
    {
      provide: getModelToken(Tenant.name),
      useValue: {},
    },
  ],
})
export class AppModule {}
