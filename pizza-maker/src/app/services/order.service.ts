import { Injectable } from '@angular/core';
import { Crust } from '../enums/crust';
import { Flavor } from '../enums/flavor';
import { Size } from '../enums/size';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private getEnumNames(enumObj: any) {
    return Object.values(enumObj).filter(x => isNaN(Number(x))) as string[]
  }

  getConfigOptions() {
    // Just using this as an example of retrieving the configurator
    // options from an API
    return new Promise<any>((resolve) => {
      resolve({
        crusts: this.getEnumNames(Crust),
        flavors: this.getEnumNames(Flavor),
        sizes: this.getEnumNames(Size),
        tables: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    })
  }
}
