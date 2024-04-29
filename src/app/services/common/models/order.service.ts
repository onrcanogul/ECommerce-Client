import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { CreateOrder } from '../../../contracts/order/create_order';
import { Observable, firstValueFrom } from 'rxjs';
import { ListOrder } from '../../../contracts/order/list_order';
import { SingleOrder } from '../../../contracts/order/single_order';
import path from 'path';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async create(order : CreateOrder): Promise<void>{
    const obs : Observable<CreateOrder> = this.httpClientService.post<CreateOrder>({controller:"orders"},order);
    await firstValueFrom(obs)
  }

  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) : Promise<{totalCount:number; orders:ListOrder[]}> {
    const obs : Observable<{totalCount:number; orders:ListOrder[]}> = this.httpClientService.get<{totalCount:number; orders:ListOrder[]}>({
      controller:"orders",
      queryString: `page=${page}&size=${size}`
    });

    const promise = firstValueFrom(obs)
    promise.then(value => successCallBack())
    .catch(error => errorCallBack(error))

    return await promise
  }
  async getOrderById(id: string, successCallBack?:() => void, errorCallBack?:(errorMessage:string) => void) : Promise<SingleOrder> {
    const obs:Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
      controller:"orders"
    },id)
      debugger;
     const promiseData = firstValueFrom(obs)
     promiseData.then(value => successCallBack())
     .catch(error => errorCallBack(error))
     
     return await promiseData;
  }

  async completeOrder(orderId:string,successCallBack:() => void) {

    const obs = this.httpClientService.post({
      controller:"orders",
      action:"complete-order"
    },{orderId})

    await firstValueFrom(obs);
    successCallBack();
  }
  async getActiveUsersOrders(page: number, size: number, succesCallback?:() => void, errorCallback?:() => void) : Promise<{totalCount:number; orders:ListOrder[]}> {
    const obs:Observable<{totalCount:number; orders:ListOrder[]}> = this.httpClientService.get<{totalCount:number; orders:ListOrder[]}>({
      controller:"orders",
      action:"active-users-orders",
      queryString:`page=${page}&size=${size}`
    })

    const promiseData = firstValueFrom(obs)
    promiseData.then(v => succesCallback())
    promiseData.catch(v => errorCallback());

    return await promiseData;
  }
}
