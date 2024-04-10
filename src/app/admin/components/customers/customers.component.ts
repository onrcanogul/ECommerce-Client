import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    
  }

  ngOnInit(): void {
    this.showSpinner(spinnerType.BallSpinClockwiseFade)
  }
}