import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private db: PrismaService) {}

  async getOne(where: Prisma.UserWhereInput) {
    return this.db.user.findFirst({ where });
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    return this.db.user.create({ data });
  }
}
