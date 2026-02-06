import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { TodosRepository } from "./todos.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todos.entity";
import { File } from "./files.entity";
import { FilesService } from "./files.service";

const ACCES = 'ESTA ES MI CLAVE SECRETA';

@Module({
    imports: [TypeOrmModule.forFeature([Todo, File])],
    providers: [
        FilesService,
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