import { ConfigModule } from '@nestjs/config/dist';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [EnvironmentService, ConfigService],
    }).compile();

    service = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
