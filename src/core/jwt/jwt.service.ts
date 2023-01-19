import { EnvironmentService } from '@core/environment';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtService implements JwtOptionsFactory {
    constructor(private readonly environmentSrvc: EnvironmentService) { }
    
    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        return {
            privateKey: this.environmentSrvc.getEnvironmentValue('JWT_SECRET'),
            publicKey: this.environmentSrvc.getEnvironmentValue('JWT_PUBLIC'),
            signOptions: {
                expiresIn: this.environmentSrvc.getEnvironmentValue('JWT_EXPIRE_TIME'),
            }
        }
    }
}
