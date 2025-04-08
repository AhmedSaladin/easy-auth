import { BadRequestException } from '@nestjs/common';
import errorMessage from '../../../common/utils/error.message';

export default function (authResults: boolean) {
  if (!authResults)
    throw new BadRequestException({ message: errorMessage.UNAUTHORIZED });
}
