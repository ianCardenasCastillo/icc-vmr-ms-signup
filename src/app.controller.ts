import { SignUpService } from './sign-up/sign-up.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
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

@Controller({
  path: 'signup',
})
export class AppController {
  constructor(private signUpService: SignUpService) {}

  @Post('execute')
  @Version([VERSION_NEUTRAL, '1'])
  async signUpTenant(@Res() res: Response, @Body() createDto: CreateTenantDto) {
    try {
      const tenantCreated = await this.signUpService.addTenant(createDto);

      return res.status(HttpStatus.CREATED).send({ tenantCreated });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error,
      });
    }
  }
}
