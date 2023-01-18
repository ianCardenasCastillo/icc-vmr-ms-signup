export class CreateTenantDto {
    email: string;
    password: string
    
    static describe(instance): Array<string> {
        return Object.getOwnPropertyNames(instance);
    }
}