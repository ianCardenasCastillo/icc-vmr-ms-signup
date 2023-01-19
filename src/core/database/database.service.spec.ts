import { ConfigModule } from '@nestjs/config/dist';
import { EnvironmentModule } from './../environment/environment.module';
import { EnvironmentService } from './../environment/services/environment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule, ConfigModule],
      providers: [DatabaseService, EnvironmentService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
