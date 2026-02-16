import { Body, Controller, Delete, FileTypeValidator, Get, Headers, HttpException, HttpStatus, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseUUIDPipe, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { Request, Response } from "express";
import { AuthGuard } from "src/guards/auth.guards";
import { DateAdderInterceptor } from "src/interceptors/date-adder.interceport";
import { UsersDbService } from "./usersDB.service";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MinSizeValidatorPipe } from "src/pipes/min-size-validator.pipe";
import { AuthService } from "./auth.service";
import { UserCredentialsDto } from "./dtos/UserCredentials.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    private usersDbService: UsersDbService, 
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService
  ) {}
  @Get()
  getUsers(@Query("name") name?: string) {
    if(name) {
      return this.usersDbService.getUserByName(name);
    }
    return this.usersDbService.getUsers();
  }

  @Get("profile") 
  @UseGuards(AuthGuard)
  getUserProfile(/*@Headers("token") token: string*/  @Req() request: Request & { user: any },
) {
    // if(token != "1234") {
    //   return "Sin acceso";
    // }
    console.log(request.user);
    return "Este endpoint retorna el perfil del usuario";
  }
  
  @Post("profile/images")
  @UseInterceptors(FileInterceptor("image"))
  @UsePipes(MinSizeValidatorPipe)
  // @UseGuards(AuthGuard)
  getUserImages(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 100000,
          message: "El tamaño del archivo es demasiado grande. El tamaño máximo permitido es 100KB."
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/,
        }),
      ],
    }),
  ) file: Express.Multer.File) {
    // return  this.cloudinaryService.uploadimage(file);
    return file;
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

  @Get("admin")
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAdmin() {
    return "Ruta protegida";
  }
  
  @Get(":id")
  async getUserById(@Param("id", ParseUUIDPipe) id: string) {
    const user = await this.usersDbService.getUserById(id);
    if(!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user
  }

  @Post("signup")
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: CreateUserDto, @Req() request: Request & { now: string }) {
    console.log("dentro del endpoint:", request.now);
    return this.authService.signUp({...user, createdAt: request.now});
  }

  @Post("signin")
  async signIn( @Body() user: UserCredentialsDto ) {
    return this.authService.signIn( user.email, user.password);
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

