import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './core/database';
import { EnvironmentModule, EnvironmentService } from './core/environment';
import { Tenant, TenantSchema } from './schemas/tenant.schema';

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
    AppService,
    DatabaseService
  ],
})
export class AppModule {}
