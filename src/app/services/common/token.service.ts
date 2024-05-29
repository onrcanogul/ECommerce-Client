import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private jwtHelper:JwtHelperService) 
  { 
    
  }

  
  checkUserRole(): boolean{
    const token = localStorage.getItem('accessToken');
    if(token && !this.jwtHelper.isTokenExpired(token))  {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const userRole = decodedToken['role'];
    
    
    if(userRole == 'admin')
      return true
    else 
    return false
   } else 
      return false;
  }

  get isAdmin(): boolean {
    return this.checkUserRole();
  }
 
}

export let isAdmin: boolean;


