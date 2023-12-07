import { Component, OnInit, inject } from '@angular/core';
import { WorkOrderService } from '../../services/work-order.service';
import { Router, RouterModule } from '@angular/router';
import { StoreWorkOrderService } from '../../services/store-work-order.service';
import { WorkOrder } from '../../models/work-order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-per-day',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './work-per-day.component.html',
  styles: ``
})
export class WorkPerDayComponent implements OnInit {

  private storeWorkOrderService = inject(StoreWorkOrderService);

  private workOrder = inject(WorkOrderService);

  private router = inject(Router);

  listWorkOrder: WorkOrder[] = [];

  ngOnInit(): void {
    this.listWorkOrder = this.storeWorkOrderService.getListWOrkOrder().reverse();
  }

  createOrder(){
    const orderNumber = this.workOrder.createNewWorkOrder();
    this.router.navigate(['/orders', orderNumber]);
  }



}
