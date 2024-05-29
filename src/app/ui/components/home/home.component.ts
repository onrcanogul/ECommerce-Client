import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../services/common/models/product.service';
import { ListProduct } from '../../../contracts/list_product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends BaseComponent implements OnInit {
 
 constructor(spinner:NgxSpinnerService, private productService:ProductService,@Inject("azureStorage") public azureStorage:string) {
  super(spinner);
  
 }

  products: { totalCount: number; products: ListProduct[] };
  async ngOnInit() {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    debugger;
    this.products = await this.productService.read(0,5);

    this.products.products.forEach(p => {
      if(p.productImageFiles.length>0)
      {
          p.productImageFiles.forEach(image => {
            if(image.showCase == true)
              p.path = image.path;
          })
      }    
        }); 

    
  }
  



}
