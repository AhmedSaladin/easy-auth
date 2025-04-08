import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import errorMessage from '../../../common/utils/error.message';

export class LoginValidation {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: errorMessage.EMAIL_IS_REQUIRED })
  email: string;

  @IsNotEmpty({ message: errorMessage.PASSWORD_IS_REQUIRED })
  password: string;
}
