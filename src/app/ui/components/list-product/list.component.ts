import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { ProductService } from '../../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../../../services/common/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectProductImageDialogComponent } from '../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { ListProduct } from '../../../contracts/list_product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {
  
  constructor(spinner:NgxSpinnerService,private productService:ProductService ,private dialogService:DialogService) {
    super(spinner)
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate' , 'updatedDate','photos','edit','delete',];
  dataSource:MatTableDataSource<ListProduct> = null;

  async getProducts()
  {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const products : {totalCount:number; products:ListProduct[]} = await this.productService.getActiveUsersProducts(this.paginator ? this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,()=>{this.hideSpinner(spinnerType.BallClipRotatePulse)},
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
