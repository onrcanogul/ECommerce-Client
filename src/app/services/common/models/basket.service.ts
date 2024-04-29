import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { ListBasketItem } from '../../../contracts/basket/list_basket_item';
import { Observable, firstValueFrom } from 'rxjs';
import {  CreateBasketItem } from '../../../contracts/basket/create_basket_item';
import { UpdateBasketItem } from '../../../contracts/basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private httpClientService: HttpClientService) { }

  async get() : Promise<ListBasketItem[]> {
   const obs : Observable<ListBasketItem[]> =  this.httpClientService.get<ListBasketItem[]>({
      controller:"baskets",
    });
     return await firstValueFrom(obs);
  }

  async add(basketItem : Partial<CreateBasketItem>) : Promise<void> {
    const obs : Observable<CreateBasketItem> = this.httpClientService.post<CreateBasketItem>({
        controller:"baskets"
      },basketItem);
     await firstValueFrom(obs);
  }

  async updateQuantity(basketItem : Partial<UpdateBasketItem>) : Promise<void> {
    const obs: Observable<UpdateBasketItem> = this.httpClientService.put<UpdateBasketItem>({
      controller:"baskets"
    },basketItem);
    await firstValueFrom(obs);
  }

  async remove(basketItemId : string) : Promise<void> {
    const obs : Observable<any> = this.httpClientService.delete({
      controller:"baskets"
    },basketItemId);
    await firstValueFrom(obs)
  }
}
