import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/common/models/category.service';
import { ListCategory } from '../../contracts/category/list-category';
import { ProductService } from '../../services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../base/base.component';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css'
})


export class EditProductDialogComponent extends BaseDialog<EditProductDialogComponent> implements OnInit {
  constructor(dialogRef:MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr : CustomToastrService,
    private spinner: NgxSpinnerService
  ){
    super(dialogRef);
  }
  category: ListCategory;
  async ngOnInit() {
    this.category = await this.categoryService.get(-1, -1);
  }


  async editProduct(id: string,name: string, price: string, stock: string, categories: string[]) {
    this.spinner.show(spinnerType.BallClipRotatePulse)
    const newPrice = parseInt(price);
    const newStock = parseInt(stock);



    await this.productService.updateProduct({
      id: id,
      name : name,
      categories : categories,
      price : newPrice,
      stock : newStock
    })
    await this.toastr.message(`Product updated. Id: ${id}`,"Successful",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    })
    this.spinner.hide(spinnerType.BallClipRotatePulse)
  }

}


export enum EditProductDeleteState {
  Yes, No
}
