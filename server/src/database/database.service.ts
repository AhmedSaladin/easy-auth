import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable({})
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    console.log(config);
    super({
      errorFormat: 'minimal',
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
      log:
        config.get('NODE_ENV') == 'development'
          ? [
              {
                emit: 'stdout',
                level: 'query',
              },
              {
                emit: 'stdout',
                level: 'error',
              },
              {
                emit: 'stdout',
                level: 'info',
              },
              {
                emit: 'stdout',
                level: 'warn',
              },
            ]
          : undefined,
    });
  }
}
