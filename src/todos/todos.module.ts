import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { TodosRepository } from "./todos.repository";

const ACCES = 'ESTA ES MI CLAVE SECRETA';

@Module({
    providers: [
        TodosService, 
        TodosRepository,
        {
            provide: 'ACCES_TOKEN',
            useValue: ACCES,
        },
    ],
    controllers: [TodosController],
})
export class TodosModule {}