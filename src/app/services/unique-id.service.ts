import { Injectable, signal, inject } from '@angular/core';
import { StoreIdService } from './store-id.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueIdService {

  private workOrderId = signal(0);

  private orderId = signal(0);

  private productId = signal(0);

  private storeId = inject(StoreIdService);

  constructor() {
    this.workOrderId.set(this.storeId.getId('workOrderId'));
    this.orderId.set(this.storeId.getId('orderId'));
    this.productId.set(this.storeId.getId('productId'));
  }

  newWorkOrderId(){
    this.workOrderId.update(value => value + 1);
    let id = this.workOrderId();

    //Save last id
    this.storeId.saveLastId('workOrderId',id);

    return id;
  }

  newOrderId(){
    this.orderId.update(value => value + 1);
    let id = this.orderId();

    //Save last id
    this.storeId.saveLastId('orderId',id);

    return id;
  }

  newProductId(){
    this.productId.update(value => value + 1);
    let id = this.productId();

    //Save last id
    this.storeId.saveLastId('productId',id);
  }

}












