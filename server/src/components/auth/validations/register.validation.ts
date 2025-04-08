import { IsNotEmpty, MinLength, Matches } from 'class-validator';
import errorMessage from '../../../common/utils/error.message';
import { PASSWORD_PATTERN } from 'src/common/utils/regex';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterValidation {
  @IsNotEmpty({ message: errorMessage.EMAIL_IS_REQUIRED })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: errorMessage.PASSWORD_IS_REQUIRED })
  @Matches(PASSWORD_PATTERN, { message: errorMessage.PASSWORD_WEAK })
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
