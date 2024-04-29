import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../../../services/common/models/role.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService , private roleService:RoleService, private toastr:CustomToastrService){
    super(spinner)
  }


  state:{succeeded : boolean}
  @Output() createdRole : EventEmitter<any> = new EventEmitter();
  async createRole(name:string){
    this.showSpinner(spinnerType.BallClipRotatePulse);
    this.state = await this.roleService.create(name);
    if(this.state.succeeded) {
      this.toastr.message("Role has been added","Successful",{messageType:ToastrMessageType.Success , position:ToastrPosition.TopRight})   
      this.createdRole.emit();
    }
    else 
      this.toastr.message("Role could not been added","Error",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
    this.hideSpinner(spinnerType.BallClipRotatePulse);
  } 

}
