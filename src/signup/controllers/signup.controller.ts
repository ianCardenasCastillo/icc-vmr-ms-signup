import { SignUpService } from '../services/signup.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import {
  Body,
  Controller,
  Post,
  Version,
  VERSION_NEUTRAL,
  UseFilters,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter, MongoExceptionFilter } from '@core/filters';

@ApiTags('signup')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
@Controller({
  path: 'signup',
})
export class SignUpController {
  constructor(
    private signUpService: SignUpService,
    private jwtService: JwtService,
  ) {}

  @ApiCreatedResponse({
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...CxUPUosOGaXyEgQp8kk',
      },
    },
  })
  @ApiInternalServerErrorResponse()
  @Post('execute')
  @Version([VERSION_NEUTRAL, '1'])
  async signUpTenant(@Body() createDto: CreateTenantDto) {
    const tenantCreated = await this.signUpService.addTenant(createDto);
    const payload = JSON.parse(JSON.stringify(tenantCreated));
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
