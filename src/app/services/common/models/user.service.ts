import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { User } from '../../../entities/User';
import { Create_User } from '../../../contracts/users/Create_User';
import { Observable, firstValueFrom } from 'rxjs';
import { Login_User } from '../../../contracts/users/Login_User';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService , private toastr : CustomToastrService) { }


  async create(user:User) 
  {
    const obs : Observable<any> = this.httpClientService.post<User | Create_User>({
      controller:"users",
    },user);

   return await firstValueFrom(obs);   
  }

 
}
