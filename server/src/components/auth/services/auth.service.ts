import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import doesNotExistGuard from '../../../common/guards/doesNotExist.guard';
import errorMessage from '../../../common/utils/error.message';
import { AuthUtils } from '../utils/auth.util';
import { JwtService } from '@nestjs/jwt';
import doesExistGuard from '../../../common/guards/doesExist.guard';
import Login from '../dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { JwtUser } from '../../../common/interfaces/jwt-user';
import isItRightCredentialsGuard from '../guards/isItRightCredentials.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepository,
    private readonly utils: AuthUtils,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.repo.getOne({ email });
    doesNotExistGuard(user, errorMessage.USER_NOT_FOUND);

    const authResult = await this.utils.comparePasswords(
      user!.password,
      password,
    );
    isItRightCredentialsGuard(authResult);

    const payload: JwtUser = { id: user!.id, email: user!.email };
    const token = await this.jwt.signAsync(payload);

    return plainToInstance(
      Login,
      { token: `Bearer ${token}` },
      { excludeExtraneousValues: true },
    );
  }

  async register(email: string, password: string, name: string) {
    const user = await this.repo.getOne({ email });
    doesExistGuard(user, errorMessage.EMAIL_EXISTS);

    const hashedPassword = await this.utils.generateHash(password);

    await this.repo.create({ email, password: hashedPassword, name });
  }
}
