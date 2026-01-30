import { Inject, Injectable } from "@nestjs/common";
import { TodosRepository } from "./todos.repository";

@Injectable()
export class TodosService {
    constructor(private todosRepository: TodosRepository, @Inject('ACCES_TOKEN') private accesToken: string ) {}
    getTodos() {
        return this.accesToken == 'ESTA ES MI CLAVE SECRETA' ? 
        this.todosRepository.getTodos(): "No tiene acceso a esta información";
    }
}