import { Injectable } from "@nestjs/common";

@Injectable()
export class TodosRepository {
    private todos = [
        {
            id: 1,
            title: 'Todo 1',
            description: 'Description 1',
            isCompleted: false, 
        }
    ];

    async getTodos() {
        return this.todos;
    }
}