import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { DialogService } from '../../../services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../../../services/common/models/order.service';
import { CustomToastrService } from '../../../services/common/custom-toastr.service';
import { ListOrder } from '../../../contracts/order/list_order';
import { OrderDetailsDialogComponent } from '../../../dialogs/order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private dialogService:DialogService ,private toastr:CustomToastrService , private orderService:OrderService) {
    super(spinner)
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate','orderDetails', 'completed', 'delete'];
  dataSource:MatTableDataSource<ListOrder> = null;

  async getOrders()
  {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const allOrders : {totalCount:number; orders:ListOrder[]} = await this.orderService.getActiveUsersOrders(this.paginator ? this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,
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
