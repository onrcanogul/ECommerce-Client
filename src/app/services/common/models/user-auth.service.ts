import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Login_User } from '../../../contracts/users/Login_User';

import { Observable, firstValueFrom } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { Token } from '../../../contracts/token/token';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClientService:HttpClientService,
    private toastr : CustomToastrService

  ) {
    
   }
   async login(user:Partial<Login_User> , callBack?:() => void){
    debugger;
    const obs : Observable<any> = this.httpClientService.post<Login_User | Token>({
      controller:"auth",
      action:"login"
    },user);
    
    const token : Token = await firstValueFrom(obs) as Token;
    if(token)
    {
      console.log(token)
      localStorage.setItem('accessToken',token.accessToken);  
      localStorage.setItem('refreshToken' , token.refreshToken)
      this.toastr.message("Successful Login " , "Successful", {messageType:ToastrMessageType.Success, position:ToastrPosition.TopRight} )

    }
    callBack();
  }

  async googleLogin(user:SocialUser , callback:() => void)
  {
    const obs : Observable<Token | SocialUser> = this.httpClientService.post<SocialUser | Token>({
      controller:"auth",
      action:"googlelogin"
    },user)

    let token : Token = await firstValueFrom(obs) as Token;
    debugger;
    if(token)
    {
        localStorage.setItem('accessToken' , token.accessToken)
        localStorage.setItem('refreshToken' , token.refreshToken)
    }
    callback();
  }


  async refreshTokenLogin(refreshToken : string , callBack?:(state) => void)
  { 
    const obs :Observable<any|Token> = this.httpClientService.post({
      controller:"auth",
      action:"refreshTokenLogin"

    },{refreshToken})

    try{
      const token : Token = await firstValueFrom(obs) as Token;

      if(token) {
      localStorage.setItem('accessToken', token.accessToken);  
      localStorage.setItem('refreshToken', token.refreshToken);
      }
      callBack(token ? true : false);
    }
    catch{
      callBack(false);
    }   
  }
  async passwordReset(email: string, callBack?:() => void) {
    const obs = this.httpClientService.post({
      controller:"auth",
      action:"password-reset"
    },{email})

    await firstValueFrom(obs);
    callBack();

  }

  async verifyResetToken(resetToken: string, userId: string, callBack?:() => void) : Promise<boolean> {
    const obs : Observable<any> = this.httpClientService.post({
      controller:"auth",
      action:"verify-reset-token"
    },{
      resetToken,userId
    });

    const state :boolean = await firstValueFrom(obs);
    callBack();
    return state;
  }
  
  }
