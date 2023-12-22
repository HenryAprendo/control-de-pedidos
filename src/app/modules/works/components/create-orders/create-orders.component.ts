import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../../../services/menu.service';
import { Article } from '../../../../models/article.model';
import { numberOfTowers, numberOfApartment } from '../../../../data/locations';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-orders.component.html',
  styles: ``
})
export class CreateOrdersComponent implements OnInit {

  numTowers = numberOfTowers.slice();

  numApartments = numberOfApartment.slice();

  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private menuService = inject(MenuService);

  menuProducts: Article[] = [];

  private numberOrder = signal(0);

  readNumOrder = computed(() => this.numberOrder());

  formLocations!:FormGroup;

  constructor(){
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.parent?.paramMap
      .subscribe( params => {
        this.numberOrder.set(Number(params.get('orderNumber')));
      });

    this.menuProducts = this.menuService.retrieve()

  }

  private buildForm(){
    this.formLocations = this.fb.group({
      tower: [1,[Validators.required]],
      apartment: [101,[Validators.required]]
    });
  }

  get towerField(){
    return this.formLocations.get('tower');
  }

  get apartmentField(){
    return this.formLocations.get('apartment');
  }

}








