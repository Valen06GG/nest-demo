import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersDbService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    saveUser(user: Omit<User, "id">) {
        this.usersRepository.save(user);
    }

    getUserById(id: string) {
      return this.usersRepository.findOne({ where: { id } });
    }

    getUserByName(name: string) {
      return this.usersRepository.findOne({where: { name }})
    }

    getUsers() {
      return this.usersRepository.find();
    }

    getUserByEmail(email: string) {
      return this.usersRepository.findOne({ where: { email } });
    }

    create(arg0: { password: any; id: string; name: string; email: string; createdAt: string; }) {
        throw new Error("Method not implemented.");
    }
}