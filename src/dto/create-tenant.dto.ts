import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateTenantDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
    
    static describe(instance): Array<string> {
        return Object.getOwnPropertyNames(instance);
    }
}