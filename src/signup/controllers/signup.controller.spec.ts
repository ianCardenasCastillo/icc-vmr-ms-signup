import { CreateTenantDto } from '../dto/create-tenant.dto';
import { SignUpService } from '../services/signup.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './signup.controller';
import { Tenant } from '../schemas/tenant.schema';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { createMock } from '@golevelup/ts-jest';
import { StatusTenantAvailable } from '../enums/tenant.enum';

describe('SignUpController', () => {
  let signUpController: SignUpController;
  let signUpSrvc: SignUpService;
  let jwtSrvc: JwtService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        SignUpService,
        {
          provide: getModelToken(Tenant.name),
          useValue: Tenant,
        },
        JwtService,
      ],
    })
      .overrideProvider(SignUpService)
      .useValue(createMock<SignUpService>())
      .overrideProvider(JwtService)
      .useValue(createMock<JwtService>())
      .compile();

    signUpController = app.get<SignUpController>(SignUpController);
    signUpSrvc = app.get<SignUpService>(SignUpService);
    jwtSrvc = app.get<JwtService>(JwtService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('should toBeDefined', () => {
    it('signUpController toBeDefined', () => {
      expect(signUpController).toBeDefined();
    });
    it('signUpSrvc toBeDefined', () => {
      expect(signUpSrvc).toBeDefined();
    });
    it('jwtSrvc toBeDefined', () => {
      expect(jwtSrvc).toBeDefined();
    });
  });
  describe('should', () => {
    describe('signUpSrvc', () => {
      it('called one time', async () => {
        const spySignUpSrvc = jest.spyOn(signUpSrvc, 'addTenant');
        await signUpController.signUpTenant({} as any);
        expect(spySignUpSrvc).toBeCalledTimes(1);
      });
      it('called with empty dto', async () => {
        const spySignUpSrvc = jest.spyOn(signUpSrvc, 'addTenant');
        await signUpController.signUpTenant({} as any);
        expect(spySignUpSrvc).toBeCalledWith({});
      });
      it('called with full dto', async () => {
        const data = {
          email: 'a@s.cl',
          password: 'Qewasd.23123',
        } as CreateTenantDto;
        const spySignUpSrvc = jest.spyOn(signUpSrvc, 'addTenant');
        await signUpController.signUpTenant(data);
        expect(spySignUpSrvc).toBeCalledWith(data);
      });
    });

    describe('jwtService', () => {
      it('called one time', async () => {
        const spyJwtSrvc = jest.spyOn(jwtSrvc, 'sign');
        await signUpController.signUpTenant({} as any);
        expect(spyJwtSrvc).toBeCalledTimes(1);
      });
      it('called with empty dto', async () => {
        const spyJwtSrvc = jest.spyOn(jwtSrvc, 'sign');
        await signUpController.signUpTenant({} as any);
        expect(spyJwtSrvc).toBeCalledWith({});
      });
      it('called with full dto', async () => {
        const data = {
          email: 'a@s.cl',
          password: 'Qewasd.23123',
        } as CreateTenantDto;
        const tenant = {
          createdAt: new Date(),
          updatedAt: new Date(),
          status: StatusTenantAvailable.ACTIVE,
          email: 'email',
          tenantId: 'tenantId',
          domain: 'domain',
        };
        const jsonTenant = JSON.parse(JSON.stringify(tenant));
        jest.spyOn(JSON, 'parse').mockReturnValue(jsonTenant);
        const spyJwtSrvc = jest.spyOn(jwtSrvc, 'sign');
        await signUpController.signUpTenant(data);
        expect(spyJwtSrvc).toBeCalledWith(jsonTenant);
      });
    });

    it('Json called one time', async () => {
      const spyJSONParse = jest.spyOn(JSON, 'parse');
      const spyJSONStringify = jest.spyOn(JSON, 'stringify');
      await signUpController.signUpTenant({} as any);
      expect(spyJSONParse).toBeCalledTimes(1);
      expect(spyJSONStringify).toBeCalledTimes(1);
    });
  });
});
