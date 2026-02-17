import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from "./config/auth0.config"
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard)
  app.use(auth(auth0Config));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map((error) => {
        return {property: error.property, constraints: error.constraints}
      });
      return new BadRequestException({
        alert: "Se han detectado los siguientes errores en la peticion, y te mandamos este mensaje personalizado",
        errors: cleanErrors,
      })
    }
  }));
  app.use(loggerGlobal);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
