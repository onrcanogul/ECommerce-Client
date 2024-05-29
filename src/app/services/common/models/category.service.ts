import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListCategory } from '../../../contracts/category/list-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService:HttpClientService) { }


  async get(page:number, size:number,successCallback?:() => void) : Promise<ListCategory>{
    const obs: Observable<ListCategory> = this.httpClientService.get<ListCategory>({
      controller : "categories",
      queryString : `page=${page}&size=${size}`
    });
    const promiseData = firstValueFrom(obs);
    promiseData.catch(successCallback);
    return await promiseData;
  }


  async create(name:string,successCallback?:()=>void) {
    const obs = this.httpClientService.post({
      controller:"categories"
    },{name})


    successCallback();
    await firstValueFrom(obs);
    
  }
}
