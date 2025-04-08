import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUtils {
  constructor() {}

  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    storedPassword: string,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, storedPassword);
  }
}
