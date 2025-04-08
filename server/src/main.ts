import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import configuration from './configuration/configuration';
import { SwaggerConfig } from './configuration/swagger.config';
import validationPipeConfig from './configuration/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
    forceCloseConnections: true,
  });

  app.use(helmet());
  SwaggerConfig(app);
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  app.set('trust proxy', 'loopback');
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

  await app.listen(configuration.PORT, () =>
    console.log(`Server is running...`),
  );
}
bootstrap();
