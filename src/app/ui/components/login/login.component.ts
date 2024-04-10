import { Component } from '@angular/core';
import { Login_User } from '../../../contracts/users/Login_User';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent  {
  constructor( 
    private userAuthService:UserAuthService,
    private toastr : CustomToastrService,
    spinner : NgxSpinnerService,
    private authService:AuthService,
    private router:Router,
    private activatedRoute : ActivatedRoute,
    private socialAuthService:SocialAuthService
  )
  {
    super(spinner);
    
    socialAuthService.authState.subscribe(async (user:SocialUser) => {
      console.log(user),
      this.showSpinner(spinnerType.BallClipRotatePulse)
      switch(user.provider) {
        case  "GOOGLE":
           {
            await userAuthService.googleLogin(user , () => {
            this.hideSpinner(spinnerType.BallClipRotatePulse)
            authService.identityCheck();
            router.navigate([""]);
          })
          break;
          }
      }
      
    })
  }


  async login(user:Partial<Login_User>)
  {
    this.showSpinner(spinnerType.BallClipRotatePulse);
    const response = await this.userAuthService.login(user,() => {
     
      this.authService.identityCheck();
      
      this.activatedRoute.queryParams.subscribe(params => {
       const returnUrl :string =  params['returnUrl']
       if(returnUrl)
        this.router.navigate([returnUrl]);
      else
        this.router.navigate([""])
      })
      this.hideSpinner(spinnerType.BallClipRotatePulse);
    });


  }
  
  }

