import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guards';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map(error => {
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
