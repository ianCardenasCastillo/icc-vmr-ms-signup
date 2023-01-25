import * as bcrypt from 'bcrypt';

export class SignupUtils {
  static async returnHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
