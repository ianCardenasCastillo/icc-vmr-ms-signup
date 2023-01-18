import { Module } from '@nestjs/common';
import { EnvironmentService } from './services/environment/environment.service';

@Module({
  providers: [EnvironmentService]
})
export class EnvironmentModule {}
