import { Body, Controller, Put, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/register.dto';

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

    @Put()
    async updateUser(@Body() user: Partial<CreateUserDTO>){
      return await this.usersService.updateUserService(user)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:string){
      return await this.usersService.deleteUserService(id)
    }
    
}
