import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { create_Product } from '../../../../contracts/create_Product';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent {
  
  constructor(spinner:NgxSpinnerService,private productService:ProductService, private toastr:CustomToastrService) {
   super(spinner)  
  }

  
  @Output() createdProduct: EventEmitter<any> = new EventEmitter();

  create(name:HTMLInputElement, stock:HTMLInputElement, price:HTMLInputElement){
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const createProduct : create_Product = new create_Product();
    createProduct.name = name.value;
    createProduct.price = parseInt(price.value)
    createProduct.stock = parseInt(stock.value)
    this.productService.create(createProduct,
      () => {   
      this.toastr.message("Product added successfully.","Successfull",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
      this.createdProduct.emit();
    },(messages) => {
      messages.forEach((message,index) => {
        this.toastr.message(message,"Error",{messageType:ToastrMessageType.Error , position:ToastrPosition.TopRight})
      })
    });
    this.hideSpinner(spinnerType.BallClipRotatePulse)
  }
}
