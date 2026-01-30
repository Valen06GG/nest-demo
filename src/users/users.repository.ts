import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = [
        {
            id: 1,
            name: 'Valentin',
            email: 'valentin@gmail.com'
        }
    ];

    async getUsers() {
        return this.users;
    }
}