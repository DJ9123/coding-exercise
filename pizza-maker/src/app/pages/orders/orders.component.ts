import { Component } from '@angular/core';
import { OrderConfig } from 'src/app/interfaces/order-config';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  displayedColumns: string[] = ['Crust', 'Flavor', 'Order_ID', 'Size', 'Table_No', 'Timestamp'];
  data: OrderConfig[] = [];
  dataSource = new MatTableDataSource<OrderConfig>(this.data);

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders()
      .pipe(first())
      .subscribe(
        {
          next: (v: OrderConfig[]) => {
            this.data = v;
            this.dataSource = new MatTableDataSource(this.formatData(this.data));
          }
        }
      );
  }

  formatData(data: OrderConfig[]) {
    return data.map(order => {
      return order;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
