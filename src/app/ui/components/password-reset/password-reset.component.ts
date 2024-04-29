import { Component } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService , private userAuthService:UserAuthService , private toastr:CustomToastrService) {
    super(spinner)
  }


  async passwordReset(email:string) {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    await this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(spinnerType.BallClipRotatePulse)
      this.toastr.message("Email has been sent.", "Check your email", {messageType:ToastrMessageType.Info,position:ToastrPosition.TopRight})
    });
  }
}
