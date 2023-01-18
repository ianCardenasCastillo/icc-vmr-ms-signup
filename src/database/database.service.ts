import { EnvironmentService } from './../environment/services/environment.service';
import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  constructor(private readonly environmentSrvc: EnvironmentService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `${this.environmentSrvc.getEnvironmentValue(
        'MONGODB_URL',
      )}/${this.environmentSrvc.getEnvironmentValue('MONGODB_DATABASE')}`,
    };
  }
}
