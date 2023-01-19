import { SignUpService } from './sign-up/sign-up.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { Tenant } from './schemas/tenant.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        SignUpService,
        {
          provide: getModelToken(Tenant.name),
          useValue: {},
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should appController toBeDefined', () => {
      expect(appController).toBeDefined();
    });
  });
});
