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
    async allCarsService(queryDto: QueryCarDto) {
        const { brand, price, year } = queryDto;
      
        const query = this.carsRepository.createQueryBuilder('car')
          .leftJoinAndSelect('car.users', 'user'); // Relación con 'users'
      
        if (brand) {
          query.andWhere('car.brand ILIKE :brand', { brand: `%${brand}%` });
        }
      
        if (price) {
          const [minPrice, maxPrice] = price.split('-').map(Number); // Rango de precios
          if (!isNaN(minPrice)) {
            query.andWhere('car.pricePerDay >= :minPrice', { minPrice });
          }
          if (!isNaN(maxPrice)) {
            query.andWhere('car.pricePerDay <= :maxPrice', { maxPrice });
          }
        }
      
        if (year) {
          const [minYear, maxYear] = year.split('-').map(Number); // Rango de años
          if (!isNaN(minYear)) {
            query.andWhere('car.year >= :minYear', { minYear });
          }
          if (!isNaN(maxYear)) {
            query.andWhere('car.year <= :maxYear', { maxYear });
          }
        }
      
        const cars = await query.getMany();
      
        return cars;
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
            brand: dataCars.brand,
            model: dataCars.model,
            year: dataCars.year,
            pricePerDay: dataCars.pricePerDay,
            image: dataCars.image,
            description: dataCars.description,
            transmission: dataCars.transmission,
            fuelType: dataCars.fuelType,
            kilometer: dataCars.kilometer,
            brakes: dataCars.brakes,
            rating: dataCars.rating,
            status: dataCars.status,
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
