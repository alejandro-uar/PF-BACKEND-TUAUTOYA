import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { ApprovalStatus } from './cars.enum';
import { CreateCarDto, QueryCarDto } from '../cars/dtos/cars.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  // Obtener todos los autos con filtros
  @ApiOperation({ summary: 'Obtener lista de autos con filtros opcionales por marca, precio y año' })
  @ApiQuery({ name: 'brand', required: false, type: String, description: 'Filtrar por marca' })
  @ApiQuery({ name: 'price', required: false, type: String, description: 'Filtrar por precio' })
  @ApiQuery({ name: 'year', required: false, type: String, description: 'Filtrar por año' })
  @ApiResponse({ status: 200, description: 'Lista de autos filtrados' })
  @Get()
  async findCars(@Query() query: QueryCarDto) {
    return await this.carsService.allCarsService(query);
  }

  // Obtener datos de un auto por su ID
  @ApiOperation({ summary: 'Obtener detalles completos de un auto específico por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del auto a obtener' })
  @ApiResponse({ status: 200, description: 'Auto encontrado con éxito' })
  @ApiResponse({ status: 404, description: 'Auto no encontrado' })
  @Get(':id')
  async findByIdCar(@Param('id') id: string) {
    return await this.carsService.findCarsByIdService(id);
  }

  // Obtener autos de un proveedor por su ID de usuario
  @ApiOperation({ summary: 'Obtener todos los autos de un proveedor específico' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del proveedor cuyos autos se desean obtener' })
  @ApiResponse({ status: 200, description: 'Autos del proveedor obtenidos con éxito' })
  @Get('provider/:userId')
  async getCarsByProvider(@Param('userId') userId: string) {
    return await this.carsService.getCarsByProviderService(userId);
  }

  // Crear un nuevo auto
  @ApiOperation({ summary: 'Registrar un nuevo auto en el sistema' })
  @ApiBody({ type: CreateCarDto })
  @ApiResponse({ status: 201, description: 'Auto registrado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  async registerCar(@Body() cars: CreateCarDto) {
    return await this.carsService.createCarsService(cars);
  }

  // Eliminar un auto por su ID
  @ApiOperation({ summary: 'Eliminar un auto específico por su ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del auto a eliminar' })
  @ApiResponse({ status: 200, description: 'Auto eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Auto no encontrado' })
  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    return await this.carsService.deleteCarService(id);
  }

  // Actualizar estado de aprobación de un auto
  @ApiOperation({ summary: 'Actualizar el estado de aprobación de un auto' })
  @ApiParam({ name: 'id', type: String, description: 'ID del auto cuyo estado se actualizará' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        approvalStatus: { type: 'string', enum: Object.values(ApprovalStatus) }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Estado de aprobación actualizado con éxito' })
  @ApiResponse({ status: 400, description: 'Estado de aprobación inválido' })
  @Patch(':idapproval')
  async updateApprovalStatus(
    @Param('id') id: string,
    @Body('approvalStatus') approvalStatus: ApprovalStatus
  ) {
    return await this.carsService.updateApprovalStatus(id, approvalStatus);
  }
}