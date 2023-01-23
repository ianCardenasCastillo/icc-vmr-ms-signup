import { StatusTenantAvailable } from './../enums/tenant.enum';
import { CreateTenantDto } from './../dto/create-tenant.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from '../schemas/tenant.schema';
import { SignUpService } from './signup.service';

const mockTenant = {
  createdAt: new Date(),
  updatedAt: new Date(),
  status: StatusTenantAvailable.ACTIVE,
  email: 'email',
  tenantId: 'tenantId',
  domain: 'domain',
};

const mockModel = {
  create: jest.fn().mockResolvedValue(mockTenant),
};

describe('SignUpService', () => {
  let service: SignUpService;
  let schema: Model<TenantDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: getModelToken(Tenant.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<SignUpService>(SignUpService);
    schema = module.get<Model<TenantDocument>>(getModelToken(Tenant.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create called one time', async () => {
    const createTenant = {
      email: 'email@aa.cl',
      password: 'QWeasd.1452',
    } as CreateTenantDto;
    const spyCreate = jest.spyOn(schema, 'create');
    await service.addTenant(createTenant);
    expect(spyCreate).toBeCalledTimes(1);
  });

  it('should return created tenant', async () => {
    const createTenant = {
      email: 'email@aa.cl',
      password: 'QWeasd.1452',
    } as CreateTenantDto;
    const response = await service.addTenant(createTenant);
    expect(response).toEqual(mockTenant);
  });
});
