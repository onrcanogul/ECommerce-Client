import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { ListProductImage } from '../../contracts/list_product_image';
import { BaseComponent, spinnerType } from '../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCard } from '@angular/material/card';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DialogData } from '../delete-dialog/delete-dialog.component';

declare var $:any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.css'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService
  )
    {
      super(dialogRef)
    }
    images:ListProductImage[];
  async ngOnInit(): Promise<void> {
    this.spinner.show(spinnerType.BallClipRotatePulse)
    this.images = await this.productService.readImages(this.data as string,()=>{
      this.spinner.hide(spinnerType.BallClipRotatePulse)
    })
  }

    @Output() options:Partial<FileUploadOptions> = {
      accept: ".png, .jpg, .jpeg .gif",
      action : "upload",
      controller : "products",
      explanation : "Select a photo for product.",
      queryString : `id=${this.data}`
    }


    async deleteImage(imageId: string,event){
      this.dialogService.openDialog({
        componentType:DeleteDialogComponent,
        data:DialogData.Yes,
        callback : async ()=>{

        this.spinner.show(spinnerType.BallClipRotatePulse)
        await this.productService.deleteImage(this.data as string ,imageId,() => {
        this.spinner.hide(spinnerType.BallClipRotatePulse)
        $(event.srcElement).parent().parent().fadeOut(2000);
      })
    }})
        
    }

    async showCase(imageId:string){
      this.spinner.show(spinnerType.BallClipRotatePulse)
      debugger;
      await this.productService.ChangeShowcaseImage(imageId, this.data as string, () => {
        this.spinner.hide(spinnerType.BallClipRotatePulse)
      });
    }



}

export enum SelectProductImageState {
  Close
}
