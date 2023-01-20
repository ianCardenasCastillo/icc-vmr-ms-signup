import { SignUpService } from '../services/signup.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorsInterceptor } from '@core/interceptors';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('signup')
@UseInterceptors(ErrorsInterceptor)
@Controller({
  path: 'signup',
})
export class AppController {
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
