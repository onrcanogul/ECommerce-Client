import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {

  constructor(private spinner:NgxSpinnerService) {
    
  }

  showSpinner(type:spinnerType)
  {
    this.spinner.show(type);
    setTimeout(() => 
      this.hideSpinner(type)
    ,2000);
  }

  hideSpinner(type:spinnerType)
  {
    this.spinner.hide(type);
  }


}


export enum spinnerType{
  BallClipRotatePulse = "s1",
  BallScaleMultiple = "s2",
  BallSpinClockwiseFade = "s3"
}
