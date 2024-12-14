import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './cars.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from 'src/entities/cars.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateCarDto } from './dtos/register.dto';

@Injectable()
export class CarsService {
    constructor(
        private fileUploadRepository: FileUploadRepository,
        @InjectRepository(Cars) private readonly carsRepository: Repository<Cars>
    ){}

    //All cars services
    async allCarsService(){
        const cars = await this.carsRepository.find()
        return cars
    }

    //Create car service
    async createCarsService(file: Express.Multer.File, dataCars: CreateCarDto){
        const uploadImg = await this.fileUploadRepository.uploadImg(file)
        const newCar = this.carsRepository.create({
            brand: dataCars.brand,
            model: dataCars.model,
            year: dataCars.model,
            pricePerDay: dataCars.pricePerDay,
            image: uploadImg.secure_url,
            description: dataCars.description
        })

        return await this.carsRepository.save(newCar);
    }

}
