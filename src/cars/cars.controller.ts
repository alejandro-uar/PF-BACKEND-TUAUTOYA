import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateCarDto } from './dtos/cars.dto';


@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  
  //All cars
  @Get()
  async findCars(){
    return await this.carsService.allCarsService()
  }
  
  //All data cars by id

  //Create
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImg(@UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({
          maxSize: 200000,
          message: "File must be maximum 200kb"
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/
        })
      ]
    })
  ) file: Express.Multer.File,
    @Body() cars: CreateCarDto
  ){
    return await this.carsService.createCarsService(file,cars)
  }

  
  //Delete
  @Delete(':id')
  async deleteCar(@Param('id') id: string){
    return await this.carsService.deleteCarService(id)
  }
}
