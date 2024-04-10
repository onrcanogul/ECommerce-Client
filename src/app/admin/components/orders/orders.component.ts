import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent extends BaseComponent implements OnInit {
  
  constructor( spinner:NgxSpinnerService) {
  super(spinner)}


  ngOnInit(): void {
    this.showSpinner(spinnerType.BallScaleMultiple)
  }
  
  
 
}