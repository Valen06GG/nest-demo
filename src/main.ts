import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard)
  app.use(loggerGlobal);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
