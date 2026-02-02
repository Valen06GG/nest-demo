import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { Request, Response } from "express";
import type { User } from "./user.interface";
import { AuthGuard } from "src/guards/auth.guards";
import { DateAdderInterceptor } from "src/interceptors/date-adder.interceport";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {

    
  }
  
  @Get()
  getUsers(@Query("name") name?: string) {
    if(name) {
      return this.usersService.getUserByName(name);
    }
    return this.usersService.getUsers();
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
  
  @HttpCode(418)
  @Get("coffee")
  getCoffee() {
    return "No se hacer cafe, soy una tetera";
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
  getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: User, @Req() request: Request & { now: string }) {
    console.log("dentro del endpoint:", request.now);
    return this.usersService.createUser(user);
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

