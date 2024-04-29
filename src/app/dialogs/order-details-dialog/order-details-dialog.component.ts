import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../base/base.component';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/common/models/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SingleOrder } from '../../contracts/order/single_order';
import { DialogService } from '../../services/common/dialog.service';
import { OrderCompeleteState, OrderCompleteDialogComponent } from '../order-complete-dialog/order-complete-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrl: './order-details-dialog.component.css'
})
export class OrderDetailsDialogComponent extends BaseDialog<OrderDetailsDialogComponent> implements OnInit{
  constructor(dialogRef:MatDialogRef<OrderDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OrderDetailsState | string,
        private orderService:OrderService,
        private spinner:NgxSpinnerService,
        private dialogService: DialogService,
        private toastr : CustomToastrService
  ) {
    super(dialogRef)
  }
  displayedColumns: string[] = ['name','price','quantity','totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  order: SingleOrder
  totalPrice: number;

  
  async ngOnInit() {
    debugger;
    this.spinner.show(spinnerType.BallClipRotatePulse)
    this.order = await this.orderService.getOrderById(this.data as string)
    this.dataSource = this.order.basketItems;
    this.totalPrice = this.order.basketItems.map((basketItem,index) => basketItem.price * basketItem.quantity).reduce((price,current) => price + current);
    this.spinner.hide(spinnerType.BallClipRotatePulse)
  }

  completeOrder() {
    
    this.dialogService.openDialog({
      componentType:OrderCompleteDialogComponent,
      data:OrderCompeleteState.Yes,
      callback: () => {

        this.spinner.show(spinnerType.BallClipRotatePulse);
        this.orderService.completeOrder(this.data as string,() => {
          this.toastr.message('Order is completed and mail is sent to user','Success', {
            messageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
          })
        })
        this.spinner.hide(spinnerType.BallClipRotatePulse);
        
      }
    })
  }
  

  




  
}

export enum OrderDetailsState{
  Close, OrderComplete
}





