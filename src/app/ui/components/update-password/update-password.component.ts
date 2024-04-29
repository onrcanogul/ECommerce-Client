import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService, private userAuthService:UserAuthService,private activatedRoute:ActivatedRoute,private userService:UserService, private toastr:CustomToastrService, private router:Router)
  {
    super(spinner)
  }
  state:boolean = false;
  userId: string;
  resetToken: string;
  
  
    ngOnInit(): void {
      this.showSpinner(spinnerType.BallClipRotatePulse)
      this.activatedRoute.params.subscribe({
        next:async params => {
          this.userId = params['userId']
          this.resetToken = params['resetToken']
          this.state = await this.userAuthService.verifyResetToken(this.resetToken,this.userId,() => {
            this.hideSpinner(spinnerType.BallClipRotatePulse);
          debugger;
          });
        }
      });   
  } 

  async updatePassword(password:string, confirmPassword:string) {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    debugger;
    if(password != confirmPassword) 
      this.toastr.message("Password and confirm password do not match","Warning",{messageType:ToastrMessageType.Warning , position:ToastrPosition.TopRight}) 
    else {
    await this.userService.updatePassword(this.userId,this.resetToken,password,confirmPassword, () => {
      this.toastr.message("Password has been updated","Successful",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
      this.router.navigate(["/login"])
      
    })  
  }
  this.hideSpinner(spinnerType.BallClipRotatePulse)
  }

}
