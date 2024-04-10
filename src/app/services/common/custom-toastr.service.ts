import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }

  message(message:string, title:string , toastrOption:Partial<ToastrOptions>)
  {
    this.toastr[toastrOption.messageType](message,title,{positionClass:toastrOption.position});
  }

}

export enum ToastrMessageType{
  Success="success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

export enum ToastrPosition{
  TopRight="toast-top-right",
  TopLeft="toast-top-left",
  TopCenter="toast-top-center",
  BottomRight="toast-bottom-rigth",
  BottomLeft="toast-bottom-left",
  BottomCenter="toast-bottom-center",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width"

}


export class ToastrOptions{
  messageType:ToastrMessageType;
  position:ToastrPosition;
}