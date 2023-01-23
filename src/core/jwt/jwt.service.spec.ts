import { EnvironmentService } from '@core/environment';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;
  let environmentSrvc: EnvironmentService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService, EnvironmentService, ConfigService],
    }).compile();

    service = module.get<JwtService>(JwtService);
    environmentSrvc = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call environmentSrvc 3 times', () => {
    const spyEnvSrvc = jest.spyOn(environmentSrvc, 'getEnvironmentValue');
    service.createJwtOptions();
    expect(spyEnvSrvc).toBeCalledTimes(3);
  });
  it('should return options with values', () => {
    const options = service.createJwtOptions();
    expect(options.privateKey).toEqual('JWT_SECRET');
    expect(options.publicKey).toEqual('JWT_PUBLIC');
    expect(options.signOptions.expiresIn).toEqual('JWT_EXPIRE_TIME');
  });
});
