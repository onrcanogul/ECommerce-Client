import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {


  @ViewChild(ListComponent) listComponent : ListComponent
  async createdCategory()
  {
   await this.listComponent.getCategory();
  }

}
