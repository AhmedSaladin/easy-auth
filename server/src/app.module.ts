import { Module, OnApplicationShutdown } from '@nestjs/common';
import { validate } from './configuration/env.validation';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from './configuration/logger.config';
import { DatabaseModule } from './database/database.module';
import { ComponentsModule } from './components/components.module';
import { PrismaService } from './database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { ThrottlerProxyGuard } from './common/guards/throttler-proxy.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    JwtModule.register({
      global: true,
      secret: configuration.JWT_SECRET,
      signOptions: { expiresIn: configuration.JWT_SECRET_TIME },
    }),

    ThrottlerModule.forRoot([
      {
        ttl: configuration.requestLimitTime,
        limit: configuration.requestLimit,
      },
    ]),
    LoggerModule.forRoot(loggerConfig),
    ComponentsModule,
    DatabaseModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerProxyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements OnApplicationShutdown {
  constructor(private db: PrismaService) {}
  async onApplicationShutdown() {
    await this.db.$disconnect();
    console.log('Server is shutting down...');
  }
}
