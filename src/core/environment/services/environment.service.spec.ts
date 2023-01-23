import { ConfigModule } from '@nestjs/config/dist';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;
  let configSrvc: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [EnvironmentService, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue({
        getOrThrow: jest.fn(),
      })
      .compile();

    service = module.get<EnvironmentService>(EnvironmentService);
    configSrvc = module.get<ConfigService>(ConfigService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEnvironmentValue', () => {
    it('should return the value of the environment variable', () => {
      const key = 'NODE_ENV';
      const value = 'test';

      jest.spyOn(configSrvc, 'getOrThrow').mockReturnValue(value);

      expect(service.getEnvironmentValue(key)).toEqual(value);
    });

    it('should throw an error if the environment variable is not defined', () => {
      jest.spyOn(configSrvc, 'getOrThrow').mockImplementation(() => {
        throw new Error();
      });

      expect(() => service.getEnvironmentValue('NODE_ENV')).toThrow();
    });
  });

  describe('isProd', () => {
    it('should return true if the environment variable is "production"', () => {
      const value = 'production';

      jest.spyOn(configSrvc, 'getOrThrow').mockReturnValue(value);

      expect(service.isProd).toEqual(true);
    });

    it('should return false if the environment variable is not "production"', () => {
      const value = 'development';

      jest.spyOn(configSrvc, 'getOrThrow').mockReturnValue(value);

      expect(service.isProd).toEqual(false);
    });
  });

  describe('isTest', () => {
    it('should return true if the environment variable is "test"', () => {
      const value = 'test';

      jest.spyOn(configSrvc, 'getOrThrow').mockReturnValue(value);

      expect(service.isTest).toEqual(true);
    });

    it('should return false if the environment variable is not "test"', () => {
      const value = 'development';

      jest.spyOn(configSrvc, 'getOrThrow').mockReturnValue(value);

      expect(service.isTest).toEqual(false);
    });
  });

  describe('isSwaggerEnabled', () => {
    it('should return true if the environment variable is "true"', () => {
      const expected = true;

      jest.spyOn(configSrvc, 'getOrThrow').mockReturnValue(expected);

      expect(service.isSwaggerEnabled).toEqual(expected);
    });

    it('should return false if the environment variable is not "true"', () => {
      jest.spyOn(configSrvc, 'getOrThrow').mockReturnValue(false);

      expect(service.isSwaggerEnabled).toEqual(false);
    });
  });
});
