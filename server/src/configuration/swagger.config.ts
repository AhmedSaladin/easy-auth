import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import configuration from './configuration';
import * as basicAuth from 'express-basic-auth';

const title = 'Easy App';
const description = 'Easy API documentation';

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = (app: INestApplication) => {
  if (configuration.NODE_ENV != 'development') {
    app.use(
      ['/docs', '/docs-json'],
      basicAuth({
        challenge: true,
        users: {
          admin: configuration.SWAGGER_PASSWORD,
        },
      }),
    );
  }

  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addServer(`http://localhost:${configuration.PORT}/`, 'Local environment')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`/docs`, app, document);
};
