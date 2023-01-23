import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { ICreatedTenantDto } from '../interfaces/created-tenant.interface';
import { TenantDocument } from '../schemas/tenant.schema';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
  ) {}

  async addTenant(
    createTenantDto: CreateTenantDto,
  ): Promise<ICreatedTenantDto> {
    const createdCat = await this.tenantModel.create(createTenantDto);
    return createdCat;
  }
}
