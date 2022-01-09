import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }

  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find((item) => item.id == carId);
      if (!car) {
        throw new HttpException(
          'Car with the given id is not found in our database',
          404,
        );
      }
      return resolve(car);
    });
  }

  public addCar(car) {
    return this.cars.push(car);
    // return 'Car added';
  }

  public deleteCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((item) => item.id == carId);
      if (index === -1) {
        throw new HttpException(
          'Car with the given id is not found in our database',
          404,
        );
      }
      this.cars.splice(index, 1);
      return resolve(this.cars);
    });
  }

  public updateCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((item) => item.id == carId);
      if (index === -1) {
        throw new HttpException(
          'Car with the given id is not found in our database',
          404,
        );
      }
      this.cars[index][propertyName] = propertyValue;
      return resolve(this.cars);
    });
  }
}
