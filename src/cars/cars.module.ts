import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from 'src/entities/cars.entity';
import { FileUploadRepository } from './cars.repository';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cars, Users])],
  controllers: [CarsController],
  providers: [CarsService, CloudinaryConfig, FileUploadRepository],
})
export class CarsModule {}
