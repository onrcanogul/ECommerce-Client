import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { create_Product } from '../../../contracts/create_Product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { ListProductImage} from '../../../contracts/list_product_image';
import { UpdateProduct } from '../../../contracts/update-product';

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


  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: ListProduct[] }> {
    const obs = this.httpClientService.get<{ totalCount: number; products: ListProduct[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    })
    
    return await firstValueFrom(obs)

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

  async ChangeShowcaseImage(imageId:string, productId:string, successCallback?:() => void) : Promise<void> {
   const obs =  this.httpClientService.get({
      controller:"products",
      action:"ChangeShowcase",
      queryString:`imageId=${imageId}&productId=${productId}`
    });
      await firstValueFrom(obs);
      successCallback();
  }

  async getActiveUsersProducts(page:number = 0, size:number =5, successCallBack?:() => void, errorCallback?:() => void) : Promise<{totalCount:number; products:ListProduct[]}> {
    const obs: Observable<{totalCount:number; products:ListProduct[]}> = this.httpClientService.get({
      controller:"products",
      action : "active-users-products",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(obs);
    promiseData.then(v => successCallBack());
    promiseData.catch(v => errorCallback());

    return await promiseData;
  }


  async getProductByCategory(page:number = 0, size:number = 5, categoryId: string, successCallback:() => void) : Promise<{totalCount: number; products: ListProduct[] }> {
    const obs = this.httpClientService.get<{ totalCount: number; products: ListProduct[] }>({
      controller : "products",
      action : "get-product-by-category",
      queryString : `page=${page}&size=${size}&categoryId=${categoryId}`
    });
    successCallback();
    return await firstValueFrom(obs);
  }

  async getProductWithPriceFilter(page:number, size:number,max:number,min:number,categoryId:string,successCallBack?:() => void,) : Promise<{totalCount:number; products:ListProduct[]}>{
    debugger;
    const obs : Observable<{totalCount:number; products:ListProduct[]}> = this.httpClientService.get<{totalCount:number; products:ListProduct[]}>({
      controller:"products",
      action : "get-product-with-filter",
      queryString:`page=${page}&size=${size}&max=${max}&min=${min}&categoryId=${categoryId}`
    })
    const promiseData = firstValueFrom(obs);
    promiseData.catch(v => successCallBack())

    return await promiseData;  
  }

  async updateProduct(updateProduct:Partial<UpdateProduct>) {
    debugger;
    const obs: Observable<UpdateProduct> = this.httpClientService.put({
      controller : "products",
      action : "update-product"
    },updateProduct)
    
    await firstValueFrom(obs);
  }
}


