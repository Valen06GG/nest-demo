import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import typeormConfig from "./config/typeorm";
import { JwtModule } from '@nestjs/jwt';
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { AuthGuard } from './guards/auth.guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => 
          configService.get<TypeOrmModuleOptions>("typeorm")!,
    }),
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1h" },
      secret: process.env.JTW_SECRET,
    }),
    TodosModule],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MyInterceptor,
    // }
  ],
})
export class AppModule {}
