import { SetMetadata } from '@nestjs/common';

export const IS_MESSAGE = 'isMessage';
export const MessageResponse = () => SetMetadata(IS_MESSAGE, true);
