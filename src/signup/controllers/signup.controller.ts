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

@UseInterceptors(ErrorsInterceptor)
@Controller({
  path: 'signup',
})
export class AppController {
  constructor(
    private signUpService: SignUpService,
    private jwtService: JwtService
  ) {}

  @Post('execute')
  @Version([VERSION_NEUTRAL, '1'])
  async signUpTenant(@Body() createDto: CreateTenantDto) {
    const tenantCreated = await this.signUpService.addTenant(createDto);
    const access_token = this.jwtService.sign(tenantCreated.toJSON())
    return { access_token };
  }
}
