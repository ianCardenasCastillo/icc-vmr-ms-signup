import { SignUpModule } from './signup/signup.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SignUpModule
  ],
})
export class AppModule {}
