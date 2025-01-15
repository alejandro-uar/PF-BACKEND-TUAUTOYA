import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users) 
    private readonly userRepository: Repository<Users>,
    private readonly mailerService: MailerService,
  ){}

  async findUserService(){
    const user = await this.userRepository.find()
    return user.map(({password, ...userNoPassword}) => userNoPassword)
  }

  async findUserIdByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if(!user) throw new NotFoundException('Usuario no encontrado!')

    const { id } = user;

    return id;
  }

  async findByIdUserService(id: string){
    const user = await this.userRepository.findOneBy({id: id})
    if(!user) throw new NotFoundException('Usuario no encontrado!')
    return user
  }

  async createUserService(data: Partial<Users>){
    const { password, ...otherData } =data;
    const user = await this.userRepository.findOneBy({ email: data.email})
    if(user) throw new NotFoundException('Email ya registrado');
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await this.userRepository.save({ ...otherData, password: hashedPassword });
    await this.mailerService.mailWelcome(newUser.email, newUser.name)
    const { password: _, ...userNoPassword } = newUser;
    return userNoPassword;
  }

  async updateUserService(data: Partial<Users>){
    const user = await this.userRepository.findOne({where:{email:data.email}})
    if(!user) throw new NotFoundException('Email invalido')
    await this.userRepository.update(user.id, {...data})
    return this.userRepository.findOneBy({id: user.id})
  }

  async deleteUserService(id: string){
    const user = await this.userRepository.findOneBy({id: id})
    if(!user) throw new NotFoundException('Usuario no encontrado')
    await this.userRepository.remove(user)
    return {message: "Usuario eliminado con exito!"}
    
  }

  async blockUserService(id: string){
    const user = await this.userRepository.findOneBy({ id: id });
    if(!user) throw new NotFoundException('Usuario no encontrado');

    user.isEnabled = false;
    await this.mailerService.mailBanUser('Incumplimiento de normas', user.email)
    return this.userRepository.save(user);
  }

  async enableUserService(id: string){
    const user = await this.userRepository.findOneBy({ id: id });
    if(!user) throw new NotFoundException('Usuario no encontrado');

    user.isEnabled = true;
    return this.userRepository.save(user);
  }

}
