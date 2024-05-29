import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../../../services/common/models/category.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService, private categoryService:CategoryService,private toastr:CustomToastrService){
    super(spinner);
  }

  @Output() createdCategory: EventEmitter<any> = new EventEmitter();
  async create(name:string){
    this.showSpinner(spinnerType.BallClipRotatePulse)
    await this.categoryService.create(name,()=> {
      this.toastr.message("Category has been created","Successful",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
      this.createdCategory.emit();
    });
    this.hideSpinner(spinnerType.BallClipRotatePulse)
  }

}
