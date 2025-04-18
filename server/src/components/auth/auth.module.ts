import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { AuthUtils } from './utils/auth.util';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthUtils],
})
export class AuthModule {}
