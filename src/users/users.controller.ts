import { Body, Controller, Put, Delete, Get, Param, UseGuards, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/register.dto';
import { FirebaseAuthGuard } from 'src/guards/fireabase-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    
    @Get()
    async findUser(){
      return await this.usersService.findUserService()
    }

    @Get(':id')
    async findByIdUser(@Param('id') id: string){
      return await this.usersService.findByIdUserService(id)
    }

    @Post()
    async createUser(@Body() user: Partial<CreateUserDTO>){
      return await this.usersService.createUserService(user)
    }

    @Put()
    async updateUser(@Body() user: Partial<CreateUserDTO>){
      return await this.usersService.updateUserService(user)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:string){
      return await this.usersService.deleteUserService(id)
    }
    
}
