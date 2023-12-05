import { Component, inject } from '@angular/core';
import { WorkOrderService } from '../../services/work-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-per-day',
  standalone: true,
  imports: [],
  templateUrl: './work-per-day.component.html',
  styles: ``
})
export class WorkPerDayComponent {

  private workOrder = inject(WorkOrderService);

  private router = inject(Router);

  createOrder(){
    const orderNumber = this.workOrder.createNewWorkOrder();
    this.router.navigate(['/orders', orderNumber]);
  }

}
