import { DatabaseService } from '@core/database';
import { EnvironmentModule, EnvironmentService } from '@core/environment';
import { JwtService } from '@core/jwt';
import { Module, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SignUpController } from './controllers/signup.controller';
import { Tenant, TenantSchema } from './schemas/tenant.schema';
import { SignUpService } from './services/signup.service';

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
      inject: [EnvironmentService],
    }),
  ],
  controllers: [SignUpController],
  providers: [DatabaseService, SignUpService, Logger],
})
export class SignUpModule {}
