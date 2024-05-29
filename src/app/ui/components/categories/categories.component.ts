import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/common/models/category.service';
import { ListCategory } from '../../../contracts/category/list-category';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent extends BaseComponent implements OnInit {
  constructor(private categoryService : CategoryService, spinner:NgxSpinnerService){
    super(spinner);
  }
  listCategory:ListCategory
  async ngOnInit(){
    this.showSpinner(spinnerType.BallClipRotatePulse);
    this.listCategory = await this.categoryService.get(-1, -1);


   
  }



}
