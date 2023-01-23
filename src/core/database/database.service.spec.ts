import { ConfigModule } from '@nestjs/config/dist';
import { EnvironmentModule } from './../environment/environment.module';
import { EnvironmentService } from './../environment/services/environment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let environmentSrvc: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule, ConfigModule],
      providers: [DatabaseService, EnvironmentService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    environmentSrvc = module.get<EnvironmentService>(EnvironmentService);
  });

  describe('Defined providers', () => {
    it('should be service defined', () => {
      expect(service).toBeDefined();
    });
    it('should be environment defined', () => {
      expect(environmentSrvc).toBeDefined();
    });
  });

  describe('Mongoose options uri', () => {
    it('showld defined', () => {
      const options = service.createMongooseOptions();
      expect(options.uri).toBeDefined();
    });
    it('showld equals environment', () => {
      const options = service.createMongooseOptions();
      expect(options.uri).toEqual(
        `${environmentSrvc.getEnvironmentValue(
          'MONGODB_URL',
        )}/${environmentSrvc.getEnvironmentValue('MONGODB_DATABASE')}`,
      );
    });
  });
});
