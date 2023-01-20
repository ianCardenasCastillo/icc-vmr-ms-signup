import { ApiProperty } from '@nestjs/swagger';
import { StatusTenantAvailable } from '../enums/tenant.enum';
export class CreatedTenantDto {
  @ApiProperty({
    type: Date,
    readOnly: true,
    example: new Date(),
  })
  createdAt: Date;
  @ApiProperty({
    type: Date,
    readOnly: true,
    example: new Date(),
  })
  updatedAt: Date;
  @ApiProperty({
    type: String,
    readOnly: true,
    example: 'active',
    enum: StatusTenantAvailable,
  })
  status: StatusTenantAvailable;
  @ApiProperty({
    type: String,
    readOnly: true,
  })
  email: string;
  @ApiProperty({
    type: String,
    readOnly: true,
    example: '63c8a85e2c8a5e7d8561b9d6',
  })
  tenantId: string;
  @ApiProperty({
    type: String,
    readOnly: true,
    example: 'domain.com',
  })
  domain: string;
}
