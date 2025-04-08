import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginValidation } from '../validations/login.validation';
import { RegisterValidation } from '../validations/register.validation';
import { AuthService } from '../services/auth.service';
import successMessage from '../../../common/utils/success.message';
import { MessageResponse } from '../../../common/decorators/message-response.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import Login from '../dtos/login.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'Authenticate user', type: Login })
  async login(@Body() payload: LoginValidation) {
    const result = await this.service.login(payload.email, payload.password);
    return result;
  }

  @Post('register')
  @MessageResponse()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse({
    description: 'User created',
    schema: { example: { message: successMessage.USER_CREATED } },
  })
  async register(@Body() payload: RegisterValidation) {
    await this.service.register(payload.email, payload.password, payload.name);
    return successMessage.USER_CREATED;
  }
}
