import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { first } from 'rxjs/operators';
import { OrderConfig } from 'src/app/interfaces/order-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  configuratorForm = new FormGroup({
    Crust: new FormControl('', [Validators.required]),
    Flavor: new FormControl('', [Validators.required]),
    Size: new FormControl('', [Validators.required]),
    Table_No: new FormControl(1, [Validators.required]),
  });
  toppingCount = 0;
  configOptions$: Promise<any> | null = null;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.configOptions$ = this.orderService.getConfigOptions();
  }

  updateConfig(flavor: string): void {
    // Be sure to filter out empty string from split
    let flavors = this.configuratorForm.value.Flavor?.split('-').filter(x => x !== '') || [];
    if (!flavors.includes(flavor)) {
      // Doesn't exist, add to list
      flavors.push(flavor);
    } else {
      // Exists, remove from list
      flavors = flavors.filter(x => x !== flavor);
    }
    this.toppingCount = flavors.length;
    // Recombine list
    this.configuratorForm.controls.Flavor.setValue(flavors.join('-'));
  }

  submitOrder(): void {
    this.orderService.submitOrder(this.configuratorForm.value as OrderConfig)
      .pipe(first())
      .subscribe(
        {
          next: (v) => {
            console.log(v);
          },
          error: (e) => {
            console.log(e);
          }
        }
      );
  }

}
