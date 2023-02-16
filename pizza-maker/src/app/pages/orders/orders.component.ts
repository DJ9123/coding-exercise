import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrderConfig } from 'src/app/interfaces/order-config';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  @ViewChild('input', { static: false }) filterRef!: ElementRef;
  displayedColumns: string[] = ['Delete','Order_ID', 'Size', 'Crust', 'Flavor', 'Table_No', 'Timestamp'];
  data: OrderConfig[] = [];
  dataSource = new MatTableDataSource<OrderConfig>(this.data);

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
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

  deleteOrder(order_id: number) {    
    this.orderService.deleteOrder(order_id)
    .pipe(first())
    .subscribe(
      {
        next: v => {
          console.log('next:', v);
          this.filterRef.nativeElement.value = '';
          this.data = this.data.filter(x => x.Order_ID != order_id);
          this.dataSource = new MatTableDataSource(this.formatData(this.data));
          this.notificationService.open('Successfully deleted!');
        },
        error: (e) => {
          console.error(e);
          this.notificationService.open(e.error.msg);
          if (e.status === 401) {
            this.router.navigate(['/login'], {queryParams: {prev: this.route.snapshot.url}});
          }
        }
      }
    );
  }
}
