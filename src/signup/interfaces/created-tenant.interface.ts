import { StatusTenantAvailable } from '../enums/tenant.enum';
export interface ICreatedTenantDto {
  createdAt: Date;
  updatedAt: Date;
  status: StatusTenantAvailable;
  email: string;
  tenantId: string;
  domain: string;
}
