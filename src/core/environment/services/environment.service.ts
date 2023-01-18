import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../types/environment';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configSrvc: ConfigService<Environment, true>) {}

  getEnvironmentValue<K extends keyof Environment>(key: K): Environment[K] {
    return this.configSrvc.getOrThrow(key);
  }

  get isSwaggerEnabled(): boolean {
    return this.configSrvc.getOrThrow('ENABLE_SWAGGER');
  }

  get isProd(): boolean {
    return this.configSrvc.getOrThrow('NODE_ENV') === 'production';
  }

  get isTest(): boolean {
    return this.configSrvc.getOrThrow('NODE_ENV') === 'test';
  }
}
