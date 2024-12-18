import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, QueryCarDto } from './dtos/cars.dto';


@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  
  //All cars
  @Get()
  async findCars(@Query() query: QueryCarDto){
    return await this.carsService.allCarsService(query)
  }
  
  //All data cars by id
  @Get(':id')
  async findByIdCar(@Param('id') id:string){
    return await this.carsService.findCarsByIdService(id)
  }

  //Create
  @Post()
  async registerCar(
    @Body() cars: CreateCarDto
  ){
    return await this.carsService.createCarsService(cars)
  }

  
  //Delete
  @Delete(':id')
  async deleteCar(@Param('id') id: string){
    return await this.carsService.deleteCarService(id)
  }
}
