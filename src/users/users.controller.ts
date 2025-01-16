import { Body, Controller, Put, Delete, Get, Param, UseGuards, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/register.dto';
import { FirebaseAuthGuard } from 'src/guards/fireabase-auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    
    @ApiOperation({ summary: 'Mostrar todos los usuarios', description: 'Recupera todos los usuarios registrados' })
    @ApiResponse({ status: 200, description: 'Users[{}]' })
    @Get()
    async findUser(){
      return await this.usersService.findUserService()
    }


    @Get(':id')
    @ApiOperation({ summary: 'Busca usuario por su ID', description: 'Recupera la data del usuario por su ID' })
    @ApiParam({ name: 'id', type: String, description: 'Clave unica del usuario', example: 'asdqwe3243tdsf' })
    @ApiResponse({ status: 200, description: 'User[{}]' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado!' })
    async findByIdUser(@Param('id') id: string){
      return await this.usersService.findByIdUserService(id)
    }

    @ApiOperation({summary: 'Crea un nuevo usuario'})
    @ApiBody({type: CreateUserDTO, description:'Detalles del usuario para crear'})
    @ApiResponse({status: 201, description: 'Usuario creado con exito'})
    @ApiResponse({status: 400, description: 'Entrada invalida'})
    @Post()
    async createUser(@Body() user: Partial<CreateUserDTO>){
      return await this.usersService.createUserService(user)
    }

    @Put()
    @ApiOperation({ summary: 'Actualizar usuario existente', description: 'Modifique los detalles del usuario existente' })
    @ApiBody({ type: CreateUserDTO, description: 'Detalles del usuario para actualizar.' })
    @ApiResponse({ status: 200, description: 'User[{}]' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async updateUser(@Body() user: Partial<CreateUserDTO>){
      return await this.usersService.updateUserService(user)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar usuario por su ID', description: 'Eliminar el usuario de la BD' })
    @ApiParam({ name: 'id', type: String, description: 'Identificador único del usuario para dar de baja', example: 'asdasdas2132131f' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado con exito! + mail("Incumplimiento de normas")' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async deleteUser(@Param('id') id:string){
      return await this.usersService.deleteUserService(id)
    }

    @Put(':id/block')
    @ApiOperation({ summary: 'Bloquear usuario por su ID', description: 'Evitar que un usuario acceda al sistema.' })
    @ApiParam({ name: 'id', type: String, description: 'Identificador único del usuario para bloquear', example: 'asdasd321312f' })
    @ApiResponse({ status: 200, description: 'Usuario bloqueado con exito! ' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async blockUser(@Param('id') id: string){
      return await this.usersService.blockUserService(id);
    }

    @Put(':id/enable')
    @ApiOperation({ summary: 'Habilitar a un usuario por su ID', description: 'Permite a un usuario bloqueado acceder al sistema.' })
    @ApiParam({ name: 'id', type: String, description: 'Identificador único del usuario para habilitar', example: 'asdasdsa2321f' })
    @ApiResponse({ status: 200, description: 'User[{}]' })
    @ApiResponse({ status: 404, description: 'suario no encontrado' })
    async enableUser(@Param('id') id: string){
      return await this.usersService.enableUserService(id);
    }
    
}
