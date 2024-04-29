import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../../../../contracts/list_product';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../../services/common/models/product.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { CustomToastrService } from '../../../../services/common/custom-toastr.service';
import { ListOrder } from '../../../../contracts/order/list_order';
import { OrderService } from '../../../../services/common/models/order.service';
import { OrderDetailsDialogComponent, OrderDetailsState } from '../../../../dialogs/order-details-dialog/order-details-dialog.component';
import { TokenService } from '../../../../services/common/token.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private productService:ProductService ,private dialogService:DialogService ,private toastr:CustomToastrService , private orderService:OrderService,
  private tokenService:TokenService
  ) {
    super(spinner)
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate','orderDetails', 'completed', 'delete'];
  dataSource:MatTableDataSource<ListOrder> = null;

  async getOrders()
  {
    debugger;
    const result: boolean = this.tokenService.checkUserRole();
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const allOrders : {totalCount:number; orders:ListOrder[]} = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,
    ()=>{this.hideSpinner(spinnerType.BallClipRotatePulse)});
     this.dataSource = new MatTableDataSource<ListOrder>(allOrders.orders);
     this.paginator.length = allOrders.totalCount;
  }

  async pageChanged()
  {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders()
  }

  showDetails(id:string) {
    this.dialogService.openDialog({
      componentType:OrderDetailsDialogComponent,
      data:id,
      options:{
        width : "750px"
      },
      callback:() => {

      }
    })
  }


}
