import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signal-r.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { HubUrls } from '../../../constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService , private toastr:CustomToastrService,) {
    super(spinner);
    
  }

  
  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.toastr.message(message,"Info",{messageType:ToastrMessageType.Info , position:ToastrPosition.TopRight})
    })


    this.signalRService.on(HubUrls.OrderHub , ReceiveFunctions.OrderAddedMessageReceiveFunction,message => {
      this.toastr.message(message,"Info", {messageType: ToastrMessageType.Info , position : ToastrPosition.TopRight})
    })
  }
}
