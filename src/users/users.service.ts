import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
  ){}

  async findUserService(){
    const user = await this.userRepository.find()
    return user
  }

  async findByIdUserService(id: string){
    const user = await this.userRepository.findOneBy({id: id})
    if(!user) throw new NotFoundException('Usuario no encontrado!')
    return user
  }

  async updateUserService(id:string, data: Partial<Users>){
    const user = await this.userRepository.findOneBy({id: id})
    if(!user) throw new NotFoundException('Usuario no encontrado!')
    await this.userRepository.update(id, data)
    return {message: "Datos actualizado con exito!"}
  }

  async deleteUserService(id: string){
    const user = await this.userRepository.findOneBy({id: id})
    if(!user) throw new NotFoundException('Usuario no encontrado')
    await this.userRepository.remove(user)
    return {message: "Usuario eliminado con exito!"}
    
  }

}
