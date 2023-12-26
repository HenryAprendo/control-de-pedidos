import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderService } from '../../../../services/work-order.service';
import { Router, RouterModule } from '@angular/router';
import { StoreWorkOrderService } from '../../../../services/store-work-order.service';
import { WorkOrder } from '../../../../models/work-order.model';

@Component({
  selector: 'app-home-work',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-work.component.html',
  styles: ``
})
export class HomeWorkComponent {

  private storeWorkOrderService = inject(StoreWorkOrderService);

  private workOrder = inject(WorkOrderService);

  private router = inject(Router);

  listWorkOrder: WorkOrder[] = [];

  ngOnInit(): void {
    this.listWorkOrder = this.storeWorkOrderService.getListWOrkOrder().reverse();
  }

  createOrder(){
    const orderNumber = this.workOrder.createNewWorkOrder();
    this.router.navigate(['./works/orders',orderNumber]);
  }

}
