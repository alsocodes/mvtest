import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-excepton.filter';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SWAGGER_ENVS = ['local', 'dev', 'staging'];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const { HOST, PORT, NODE_ENV, SWAGGER_USER, SWAGGER_PASSWORD } = process.env;

  const nodeEnv = NODE_ENV || 'dev';
  const swaggerUser = SWAGGER_USER || 'dev';
  const swaggerPassword = SWAGGER_PASSWORD || 'dev';

  // securing api-docs endpoint
  if (SWAGGER_ENVS.includes(nodeEnv)) {
    app.use(
      ['/docs'],
      basicAuth({
        challenge: true,
        users: {
          [swaggerUser]: swaggerPassword,
        },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Backend API')
      .setDescription('Backend Application API')
      .setVersion('0.1')
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const port = PORT || 9001;
  const host = HOST || 'localhost';
  await app.listen(port, host, () => {
    console.log(`running on ${host}:${port}`);
  });
}
bootstrap();
