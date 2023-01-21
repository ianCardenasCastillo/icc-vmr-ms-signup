import { SignUpService } from '../services/signup.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './signup.controller';
import { Tenant } from '../schemas/tenant.schema';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let appController: SignUpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        SignUpService,
        {
          provide: getModelToken(Tenant.name),
          useValue: {},
        },
        JwtService,
      ],
    }).compile();

    appController = app.get<SignUpController>(SignUpController);
  });

  describe('root', () => {
    it('should appController toBeDefined', () => {
      expect(appController).toBeDefined();
    });
  });
});
