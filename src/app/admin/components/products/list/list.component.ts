import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogComponent, SelectProductImageState } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {
  
  constructor(spinner:NgxSpinnerService,private productService:ProductService ,private dialogService:DialogService ,private toastr:CustomToastrService) {
    super(spinner)
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate' , 'updatedDate','photos','edit','delete',];
  dataSource:MatTableDataSource<ListProduct> = null;

  async getProducts()
  {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const products : {totalCount:number; products:ListProduct[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,()=>{this.hideSpinner(spinnerType.BallClipRotatePulse)},
    //  (errorMessage) => {this.toastr.message(errorMessage,"Error",{messageType:ToastrMessageType.Error , position:ToastrPosition.TopRight })}
     );
     this.dataSource = new MatTableDataSource<ListProduct>(products.products);
     this.paginator.length = products.totalCount;
  }

  async pageChanged()
  {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts()
  }

  addProductImages(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1400px"
      }
    })
  }

  

}



