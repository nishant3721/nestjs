import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDTO } from './car.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars() {
    return this.carService.getCars();
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    return this.carService.getCarById(id);
  }

  @Post()
  public addCar(@Body() car: CarDTO) {
    return this.carService.addCar(car);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    return this.carService.deleteCarById(id);
  }

  @Put(':id')
  public async updateCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.carService.updateCarById(id, propertyName, propertyValue);
  }
}
