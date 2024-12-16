import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './cars.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from 'src/entities/cars.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateCarDto } from './dtos/cars.dto';

@Injectable()
export class CarsService {
    constructor(
        private fileUploadRepository: FileUploadRepository,
        @InjectRepository(Cars) private readonly carsRepository: Repository<Cars>,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ){}

    //All cars services
    async allCarsService(){
        const cars = await this.carsRepository.find({
            relations:{
                users: true
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
    async createCarsService(file: Express.Multer.File, dataCars: CreateCarDto){
        const user = await this.userRepository.findOneBy({id: dataCars.userId})
        if(!user) throw new NotFoundException('Usuario no registrado') 
        const uploadImg = await this.fileUploadRepository.uploadImg(file)
        const newCar = this.carsRepository.create({
            brand: dataCars.brand,
            model: dataCars.model,
            year: dataCars.model,
            pricePerDay: dataCars.pricePerDay,
            image: uploadImg.secure_url,
            description: dataCars.description,
            stock: dataCars.stock,
            users: user
        })
        return await this.carsRepository.save(newCar);
    }

    //Updated car service
    async updateCarService(id: string, data: any){
        // const car = await this.carsRepository.findOneBy({id: id})
        // if(!car) throw new NotFoundException("Vehiculo no encontrado")
        // await this.carsRepository.update(id,data)
        // return { message: 'Vehículo actualizado exitosamente' }
        
    }

    //Delete car service
    async deleteCarService(id: string){
        const car = await this.carsRepository.findOneBy({id: id})
        if(!car) throw new NotFoundException("Vehiculo no encontrado")
        await this.carsRepository.remove(car)
        return { message: 'Vehículo eliminado exitosamente' };
    }

}
