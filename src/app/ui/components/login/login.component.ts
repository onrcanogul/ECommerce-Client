import { Component, OnInit } from '@angular/core';
import { Login_User } from '../../../contracts/users/Login_User';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService, _isAuthenticated } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { TokenService } from '../../../services/common/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent implements OnInit  {
  constructor( 
    private userAuthService:UserAuthService,
    private toastr : CustomToastrService,
    spinner : NgxSpinnerService,
    private authService:AuthService,
    private router:Router,
    private activatedRoute : ActivatedRoute,
    private socialAuthService:SocialAuthService,
    private tokenService:TokenService
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
          })
          break;
          }
      }
      
    })
  }
  ngOnInit(): void {
    this.showSpinner(spinnerType.BallClipRotatePulse)
  }


  async login(user:Partial<Login_User>)
  {
    debugger;
    this.showSpinner(spinnerType.BallClipRotatePulse);
    const response = await this.userAuthService.login(user,() => {
      this.tokenService.checkUserRole();
      this.authService.identityCheck();
      if(_isAuthenticated == false)
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

