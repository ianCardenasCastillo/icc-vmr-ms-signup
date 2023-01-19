import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { TenantDocument } from '../schemas/tenant.schema';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
  ) {}

  async addTenant(createTenantDto: CreateTenantDto): Promise<any> {
    const tenantRef = new this.tenantModel(createTenantDto);
    tenantRef.setPassword(createTenantDto.password);
    const validateError = tenantRef.validateSync();
    if (validateError) {
      throw validateError['errors'];
    }
    return tenantRef.save();
  }
}
