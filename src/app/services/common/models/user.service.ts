import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { User } from '../../../entities/User';
import { Create_User } from '../../../contracts/users/Create_User';
import { Observable, firstValueFrom } from 'rxjs';
import { Login_User } from '../../../contracts/users/Login_User';
import { Token } from '../../../contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { ListUsers } from '../../../contracts/users/list_users';

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

  async updatePassword(userId: string, resetToken:string, password:string, confirmPassword:string , callBack?:() => void) {
    const obs = this.httpClientService.post({
      controller:"users",
      action:"update-password"
    },{userId,resetToken,password,confirmPassword})


    await firstValueFrom(obs)
    callBack();
  }

  async getUsers(page: number, size:number, successCallback?:() => void, errorCallback?:() => void) : Promise<ListUsers> {
    const obs : Observable<ListUsers> = this.httpClientService.get<ListUsers>({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    })
    const promiseData = firstValueFrom(obs);
    promiseData.then(v => successCallback())
    promiseData.catch(v => errorCallback());

    return await promiseData;

  }

  

 
}
