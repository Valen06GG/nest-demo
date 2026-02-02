import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UsersRepository {
    
    
    private users: User[] = [
        {
            id: 1,
            name: 'Valentin',
            email: 'valentin@gmail.com'
        },
        {
            id: 1,
            name: "Leanne Graham",
            email: "Sincere@april.biz"
        },
        {
            id: 2,
            name: "Ervin Howell",
            email: "Shanna@melissa.tv"
        },
        {
            id: 3,
            name: "Clementine Bauch",
            email: "Nathan@yesenia.net"
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            email: "Julianne.OConner@kory.org"
        },
        {
            id: 5,
            name: "Chelsey Dietrich",
            email: "Lucio_Hettinger@annie.ca"
        },
        {
            id: 6,
            name: "Mrs. Dennis Schulist",
            email: "Karley_Dach@jasper.info"
        },
        {
            id: 7,
            name: "Kurtis Weissnat",
            email: "Telly.Hoeger@billy.biz"
        },
        {
            id: 8,
            name: "Nicholas Runolfsdottir V",
            email: "Sherwood@rosamond.me"
        },
        {
            id: 9,
            name: "Glenna Reichert",
            email: "Chaim_McDermott@dana.io"
        },
        {
            id: 10,
            name: "Clementina DuBuque",
            email: "Rey.Padberg@karina.biz"
        }
    ];

    async getUsers() {
        return this.users;
    }

    async getById(id: number) {
        return this.users.find((user) => user.id == id);
    }

    async getByName(name: string) {
        return this.users.find((user) => user.name == name);
    }

    async createUser(user: Omit<User, "id">) {
        const id = this.users.length + 1; 
        this.users = [... this.users, { id, ...user }];
        return { id, ...user };
    }
}