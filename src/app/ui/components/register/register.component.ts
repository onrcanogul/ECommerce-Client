import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/User';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_User } from '../../../contracts/users/Create_User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent {
  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private toastr : CustomToastrService,
    spinner:NgxSpinnerService
  )
  {
    super(spinner)
    this.frm = this.formBuilder.group({
      nameSurname:["",[Validators.required , Validators.maxLength(50), Validators.minLength(3)]],
      username:["",[Validators.required , Validators.maxLength(50),Validators.minLength(3)]],
      email:["",[Validators.email,Validators.required,Validators.maxLength(250)]],
      password:[""],
      passwordConfirm:[""]
    })
  }

  submitted:boolean = false;
  get component() {
    this.submitted = true;
    return this.frm.controls;
  }
 async onSubmit(user:User) {
  this.showSpinner(spinnerType.BallClipRotatePulse)
    this.submitted = true;
    if(this.frm.controls['invalid'])
    {
        return;
    }
    const result : Create_User = await this.userService.create(user);
    if(result.succeeded)
      {
        this.hideSpinner(spinnerType.BallClipRotatePulse);
        this.toastr.message(result.message,"Succesfull",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight,
      })
      }
    else 
    {
      this.hideSpinner(spinnerType.BallClipRotatePulse);
      this.toastr.message(result.message,"Failed",{
        messageType:ToastrMessageType.Error,
        position : ToastrPosition.TopRight
      })
    }
  }

  frm:FormGroup;
}
