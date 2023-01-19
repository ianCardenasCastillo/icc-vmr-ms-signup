import { JwtService } from '@core/jwt';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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
      inject: [EnvironmentService],
    }),
    MongooseModule.forFeature([
      {
        name: Tenant.name,
        schema: TenantSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      useClass: JwtService,
      inject: [EnvironmentService]
    }),
  ],
  controllers: [AppController],
  providers: [
    DatabaseService,
    SignUpService,
  ],
})
export class AppModule {}
