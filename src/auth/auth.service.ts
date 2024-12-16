import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { CreateUserDTO } from 'src/users/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
  ){}

  async signin(email:string, password:string){
    const user = await this.userRepository.findOneBy({email})
    if(!user) throw new NotFoundException('Usuario no encontrado!')
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
      throw new UnauthorizedException('Credenciales invalidas')
  }
  }

  async signUp(data: CreateUserDTO) {
    const user = await this.userRepository.findOneBy({ email: data.email });
  
    if (user) {
      throw new NotFoundException('Usuario ya registrado!');
    }
  
    const newUser = new Users(); 
    newUser.name = data.name;
    newUser.email = data.email;
    newUser.identity = data.identity;
    newUser.phone = data.phone;
    newUser.city = data.city;
    newUser.role = data.role;
  
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashedPassword;
  
    const savedUser = await this.userRepository.save(newUser);
    
    return savedUser;
  }
  
}
