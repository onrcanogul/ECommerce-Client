import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListRole } from '../../../contracts/role/list-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService) { }


  async create(name:string) : Promise<{succeeded:boolean}> {
    const obs:Observable<any> = this.httpClientService.post<any>({
      controller:"roles"
    },{name})
    return await firstValueFrom(obs) as {succeeded:boolean}
  }

  async getRoles(page: number = 0, size: number = 5 , successCallback?:() => void, errorCallback?:() => void) : Promise<ListRole> {
    const obs: Observable<ListRole> = this.httpClientService.get<ListRole>({
      controller:"roles",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(obs);
    promiseData.then(v => successCallback());
    promiseData.catch(e => errorCallback());

    return promiseData;
  }


  async getUsersRoles(id: string) : Promise<string[]> {
    const obs: Observable<{roles:string[]}> = this.httpClientService.get({
      controller:"roles",
      action:"users-roles",
      queryString : `id=${id}`
    })
    return (await firstValueFrom(obs)).roles
  }


  async getRolesWithoutPagination(successCallback?:() => void, errorCallback?:() => void) : Promise<ListRole> {
    const obs: Observable<ListRole> = this.httpClientService.get<ListRole>({
      controller:"roles",
    });

    const promiseData = firstValueFrom(obs);
    promiseData.then(v => successCallback());
    promiseData.catch(e => errorCallback());

    return promiseData;
  }

  async assignRole(userId:string, roles:string[], successCallback?:() => void) : Promise<{result:boolean}>  {
    debugger;
    const obs : Observable<any> = this.httpClientService.post<any>({
      controller:"roles",
      action:"assign-role",
    },{userId,roles});
      return await firstValueFrom(obs) as {result: boolean}
  }
}
