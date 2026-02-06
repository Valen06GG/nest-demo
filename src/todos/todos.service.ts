import { Inject, Injectable } from "@nestjs/common";
import { TodosRepository } from "./todos.repository";
import { Repository } from "typeorm";
import { Todo } from "./todos.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TodosService {
    constructor(
      private todosRepository: TodosRepository, 
      @Inject('ACCES_TOKEN') private accesToken: string, 
      @InjectRepository(Todo) 
      private todosDbRepository: Repository<Todo>
    ) {}
    // getTodos() {
    //     return this.accesToken == 'ESTA ES MI CLAVE SECRETA' ? 
    //     this.todosRepository.getTodos(): "No tiene acceso a esta información";
    // }

    getTodos() {
        return this.todosDbRepository.find({ relations: ['files'] });
    }

    findById(id: number) {
        return this.todosDbRepository.findOne({
             where: { id },
            relations: ['files'] 
        });  
    }

    create(todo: Omit<Todo, "id">) {
        return this.todosDbRepository.save(todo);
    }
}