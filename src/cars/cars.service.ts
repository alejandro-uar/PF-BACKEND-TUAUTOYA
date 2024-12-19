import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './cars.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from 'src/entities/cars.entity';
import { FindOneOptions, FindOptionsWhere, ILike, Repository, Or } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateCarDto, QueryCarDto } from './dtos/cars.dto';

@Injectable()
export class CarsService {
    constructor(
        private fileUploadRepository: FileUploadRepository,
        @InjectRepository(Cars) private readonly carsRepository: Repository<Cars>,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ){}

    //All cars services
    async allCarsService(queryDto: QueryCarDto){

        const { brand = null, price = null, year = null } = queryDto;

        const cars = await this.carsRepository.find({
            relations:{
                users: true
            },
            where: {
                brand: ILike(brand || '%%'),
                pricePerDay: ILike(price || '%%'),
                year: ILike(year || '%%'),
                // ...filters
            }
        })

        return cars
    }

    async findCarsByIdService(id: string){
        const car = await this.carsRepository.findOneBy({id: id})
        if(!car) throw new NotFoundException("Vehiculo no encontrado")
        return car            
    }

    //Create car service
    async createCarsService(dataCars: CreateCarDto){
        const user = await this.userRepository.findOneBy({id: dataCars.userId})

        if(!user) throw new NotFoundException('Usuario no registrado') 

        const newCar = this.carsRepository.create({
            ...dataCars,
            users: user
        })

        return await this.carsRepository.save(newCar);
    }

    
    //Delete car service
    async deleteCarService(id: string){
        const car = await this.carsRepository.findOneBy({id: id})
        if(!car) throw new NotFoundException("Vehiculo no encontrado")
        await this.carsRepository.remove(car)
        return { message: 'Vehículo eliminado exitosamente' };
    }

}
