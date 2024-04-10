import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
    
  }

 @ViewChild(ListComponent) listComponent : ListComponent
  async createdProduct()
  {
   await this.listComponent.getProducts();
  }

}
