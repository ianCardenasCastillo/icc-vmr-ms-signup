import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'me@domain.cl',
    pattern: '/^[w-.]+@([w-]+.)+[w-]{2,4}$/g',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'A*d5d6ad',
    pattern: '/^(?=.*[A-Z])(?=.*[&!@#$*])(?=.*[0-9])(?=.*[a-z]).{8,}$/',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  static describe(instance): Array<string> {
    return Object.getOwnPropertyNames(instance);
  }
}
