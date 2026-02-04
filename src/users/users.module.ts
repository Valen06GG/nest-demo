import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UsersDbService } from "./usersDB.service";



@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UsersService,
        UsersDbService,
        UsersRepository,
         {
             provide: 'API_USERS',
             useFactory: async () => {
                 const apiUsers = await fetch('https://jsonplaceholder.typicode.com/users',
                 ).then((response) => response.json());
                 return apiUsers.map(user => {
                     return {
                         id: user.id,
                         name: user.name,
                         email: user.email,
                     };
                 });
             }
         }
    ],
    controllers: [UsersController],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('users');
    }
}