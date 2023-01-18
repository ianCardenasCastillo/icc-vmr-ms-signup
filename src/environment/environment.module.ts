import { Module } from '@nestjs/common';
import { EnvironmentService } from './services/environment.service';

@Module({
  providers: [EnvironmentService]
})
export class EnvironmentModule {}
