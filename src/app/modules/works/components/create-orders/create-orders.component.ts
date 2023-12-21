import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MenuService } from '../../../../services/menu.service';
import { Article } from '../../../../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-orders.component.html',
  styles: ``
})
export class CreateOrdersComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private menuService = inject(MenuService);

  menuProducts: Article[] = [];

  ngOnInit(): void {
    // this.route.parent?.paramMap.pipe(
    //   switchMap(params => {
    //     const orderNumber = Number(params.get('orderNumber'));

    //   })
    // )

    this.menuProducts = this.menuService.retrieve()

  }

}








