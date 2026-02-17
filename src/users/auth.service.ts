import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { UsersDbService } from "./usersDB.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { Role } from "src/roles.enum";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersDbService,
        private readonly jwtService: JwtService
    ) {}

    async signUp( user: Omit<User, "id" >) {
        const dbUser = await this.usersService.getUserByEmail(user.email);
        if(dbUser) {
            throw new BadRequestException("Email already exist");
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if(!hashedPassword) {
            throw new BadRequestException("password cloud not be hashed");
        }
        this.usersService.saveUser({ ...user, password: hashedPassword });
        return { succes: "User created succesfully!" };
    }

    async signIn(email: string, password: string) {
        const dbUser = await this.usersService.getUserByEmail(email);
        if(!dbUser) {
            throw new BadRequestException("User not found");
        }
        const isPaswordValid = await bcrypt.compare(password, dbUser.password);
        if(!isPaswordValid) {
            throw new BadRequestException("Invalid Password");
        }

        const userPayload = { 
            sub: dbUser.id,
            id: dbUser.id, 
            email: dbUser.email,
            // isAdmin: dbUser.isAdmin,
            roles: [ dbUser.isAdmin ? Role.Admin : Role.User ],
        };

        const token = await this.jwtService.sign(userPayload);


        return { succes: "User logged in succesfully!", token };
    }
}