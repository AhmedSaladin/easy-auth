import { NotFoundException } from '@nestjs/common';

export default function (entity, message: string) {
  if (!entity) throw new NotFoundException({ message });
}
