import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [],
  templateUrl: './list-orders.component.html',
  styles: ``
})
export class ListOrdersComponent implements OnInit {

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.route.parent?.paramMap.subscribe(params => console.log(params.get('orderNumber')))
  }

}
