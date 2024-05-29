import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../services/common/models/product.service';
import { create_Product } from '../../../contracts/create_Product';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { CategoryService } from '../../../services/common/models/category.service';
import { Category, ListCategory } from '../../../contracts/category/list-category';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent extends BaseComponent implements OnInit {
  constructor(spinner : NgxSpinnerService,private productService:ProductService, private toastr:CustomToastrService,private categoryService:CategoryService) {
    super(spinner);
  }
  listCategory: ListCategory
  categories : Category[]
  
  async ngOnInit(){
    debugger;
    this.listCategory = await this.categoryService.get(-1,-1);
    this.categories = this.listCategory.categories
  }

  createProduct(name: string,_price: string,_stock: string,categoryId:string){
    this.showSpinner(spinnerType.BallClipRotatePulse);
    const price = parseInt(_price);
    const stock = parseInt(_stock);
    const createProduct : create_Product = new create_Product();
    createProduct.name = name;
    createProduct.price = price;
    createProduct.stock = stock;
    createProduct.categoryId = categoryId;
    this.productService.create(createProduct,() => {
      this.toastr.message("Product has been created", "asd",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    });
    this.hideSpinner(spinnerType.BallClipRotatePulse);
  }

}
