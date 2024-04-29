import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from '../../../services/common/models/basket.service';
import { ListBasketItem } from '../../../contracts/basket/list_basket_item';
import { OrderService } from '../../../services/common/models/order.service';
import { CreateOrder } from '../../../contracts/order/create_order';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import {  Router } from '@angular/router';
import { DialogService } from '../../../services/common/dialog.service';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from '../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from '../../../dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
declare var $:any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.css'
})
export class BasketsComponent extends BaseComponent  implements OnInit {
  
  constructor(spinner:NgxSpinnerService , private basketService:BasketService , private orderService:OrderService , private toastr:CustomToastrService, private router:Router , private dialogService : DialogService) {
    super(spinner);
    
  }
  basketItems : ListBasketItem[];

  async ngOnInit() {
    debugger;
    this.showSpinner(spinnerType.BallClipRotatePulse);
    this.basketItems = await this.basketService.get()
    this.hideSpinner(spinnerType.BallClipRotatePulse);
  }

  async changeQuantity(object:any) {
    this.showSpinner(spinnerType.BallClipRotatePulse);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    await this.basketService.updateQuantity({basketItemId ,  quantity})
    this.hideSpinner(spinnerType.BallClipRotatePulse);
  }

   removeBasketItem(basketItemId: string) {
    $('#basketModal').modal('hide');
    this.dialogService.openDialog({componentType:BasketItemRemoveDialogComponent,
      data:BasketItemDeleteState.Yes,     
      callback : async() => {      
        this.showSpinner(spinnerType.BallClipRotatePulse);
        await this.basketService.remove(basketItemId);
        debugger;
        $("." + basketItemId).fadeOut(500,() => {
        this.hideSpinner(spinnerType.BallClipRotatePulse);
    })
      }

    });
    
  }

  shoppingCompleted() {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({componentType:ShoppingCompleteDialogComponent,
      data:ShoppingCompleteState.Yes,
      callback:async() => {
      this.showSpinner(spinnerType.BallClipRotatePulse);
      const order : CreateOrder = new CreateOrder();
      order.address = "Eskisehir";
      order.description = "asdasdasd";
      await this.orderService.create(order)
      this.showSpinner(spinnerType.BallClipRotatePulse);
      this.toastr.message("Order has been created","Craeted", 
      {
      messageType:ToastrMessageType.Success, 
      position: ToastrPosition.TopRight
      });
    this.router.navigate(["/"])
      }
    });
    
  }



}
