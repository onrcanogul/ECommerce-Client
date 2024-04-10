import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { create_Product } from '../../../contracts/create_Product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { ListProductImage} from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:create_Product, successCallBack?:any, errorCallBack?: (messages:string[]) => void)
  {
    this.httpClientService.post({
      controller:"products"
    },product)
    .subscribe(result => {
      successCallBack();
    },(errorRepsonse:HttpErrorResponse) =>{
      const error:Array<{key:string , value:Array<string>}> = errorRepsonse.error;
      let messages:string[] = [];
      error.forEach((v, i)=> {
        v.value.forEach((value,index)=>{
          messages.push(value)
        })
      })
      errorCallBack(messages)
    })
  }


  async read(page:number=0, size:number=5,successCallBack?:() => void , errorCallBack?:(message:string) => void) : Promise<{totalCount:number; products:ListProduct[]}>{
    const promiseData : Promise<{totalCount:number; products:ListProduct[]}> = firstValueFrom(this.httpClientService.get<{totalCount:number; products:ListProduct[]}>({controller:"products" , queryString:`page=${page}&size=${size}`}))

    promiseData.then(d => successCallBack)
    promiseData.catch((errorResponse:HttpErrorResponse) => {
      errorCallBack(errorResponse.message);
    })
    return await promiseData;
  }
  async delete(id:string)
  {
   const obs: Observable<any> = this.httpClientService.delete(
    {controller:"products"}
    ,id)

    await firstValueFrom(obs) //data dönüyor
  }

  async readImages(id:string , successCallBack : () => void): Promise<ListProductImage[]>
  {
  const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
      action:"getimages",
      controller:"products",
    },id);
    const images: ListProductImage[] = await firstValueFrom(getObservable)
    successCallBack();
    return images;
  }

  async deleteImage(productId:string , imageId:string, successCallBack:() => void)
  {
    const obs : Observable<any> = this.httpClientService.delete({
      action:"deleteimage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },productId)

    await firstValueFrom(obs)
    successCallBack();
  }
}


