import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { ApprovalStatus } from './cars.enum';
import { CreateCarDto, QueryCarDto } from '../cars/dtos/cars.dto';



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

  //All data cars by userID
  @Get('provider/:userId')
  async getCarsByProvider(@Param('userId') userId: string) {
    return await this.carsService.getCarsByProviderService(userId);
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

  //Update approval status
  @Patch(':idapproval')
  async updateApprovalStatus(
    @Param('id') id: string,
    @Body('approvalStatus') approvalStatus: ApprovalStatus
  ){
    return await this.carsService.updateApprovalStatus(id, approvalStatus);
  }
}
