import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'ngx-webstorage';
import { TokenService } from '../../services/common/token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../base/base.component';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';
import { UserService } from '../../services/common/models/user.service';



export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper : JwtHelperService = inject(JwtHelperService)
  const tokenService:TokenService = inject(TokenService)
  const router:Router = inject(Router)
  const spinner:NgxSpinnerService = inject(NgxSpinnerService)
  const authService = inject(AuthService)
  const userService:UserService = inject(UserService)

  spinner.show(spinnerType.BallClipRotatePulse)
  
  // const token : string = tokenService.Token;
  // let expired:boolean;
  // try
  // {
  //   expired : jwtHelper.isTokenExpired(token);
  // }
  // catch
  // {
  //   expired = true
  // }
  
  authService.identityCheck();

  if(!authService.isAuthenticated)
  {
    spinner.hide(spinnerType.BallClipRotatePulse)
    router.navigate(["login"],{queryParams:{returnUrl : state.url}})
    console.log("FALSE")
    return false;
  }
  spinner.hide(spinnerType.BallClipRotatePulse)
  return true;
  
};
