import { SignUpService } from '../services/signup.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

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
  async signUpTenant(@Res() res: Response, @Body() createDto: CreateTenantDto) {
    try {
      const tenantCreated = await this.signUpService.addTenant(createDto);
      const access_token = this.jwtService.sign(tenantCreated.toJSON())
      return res.status(HttpStatus.CREATED).send({ access_token });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error,
      });
    }
  }
}
