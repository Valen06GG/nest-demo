import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { Request, Response } from "express";
import { AuthGuard } from "src/guards/auth.guards";
import { DateAdderInterceptor } from "src/interceptors/date-adder.interceport";
import { UsersDbService } from "./usersDB.service";
import { CreateUserDto } from "./dtos/CreateUser.dto";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService, private usersDbService: UsersDbService,) {}
  @Get()
  getUsers(@Query("name") name?: string) {
    if(name) {
      return this.usersDbService.getUserByName(name);
    }
    return this.usersDbService.getUsers();
  }

  @Get("profile") 
  getUserProfile(@Headers("token") token?: string) {
    if(token != "1234") {
      return "Sin acceso";
    }
    return "Este endpoint retorna el perfil del usuario";
  }
  
  @Get("profile/images")
  @UseGuards(AuthGuard)
  getUserImages() {
    return "Este endpoint retorna las imágenes del usuario";
  }
  
  // @HttpCode(418)
  @Get("coffee")
  getCoffee() {
    try {
      throw new Error()
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.I_AM_A_TEAPOT,
          error: "Envio del cafe fallido"
        },
        HttpStatus.I_AM_A_TEAPOT
      );
    }
  }
  
  @Get("message") 
  getMessage(@Res() response: Response) {
    response.status(200).send("Este es un mensaje");
  }
  
  @Get("request")
  getRequest(@Req() request: Request) {
    console.log(request);
    return "Esta ruta loguea el request";
  }
  
  @Get(":id")
  async getUserById(@Param("id", ParseUUIDPipe) id: string) {
    const user = await this.usersDbService.getUserById(id);
    if(!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user
  }

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: CreateUserDto, @Req() request: Request & { now: string }) {
    console.log("dentro del endpoint:", request.now);
    return this.usersDbService.saveUser({...user, createdAt: request.now});
  }

  @Put() 
  updateUser() {
    return "Este endpoint crea un usuario" ;
  }

  @Delete()
  deleteUser() {
    return "Este endpoint elimina un usuario";
  }
}

