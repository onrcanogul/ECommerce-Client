import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }


  //ViewContainerRef: Dinamik olarak yüklenecek compnenti içerisinde barındıran container'dir.(Her dinamik yükleme sürecinde önceki viewları clear etmek gerekebilir.) 

  async loadComponent(component:ComponentName , viewContainerRef: ViewContainerRef) {
    let comp: any = null;
    switch(component) {
      case ComponentName.BasketsComponent:
       comp = (await (import("../../ui/components/baskets/baskets.component"))).BasketsComponent;
       break;
    }
    viewContainerRef.clear(); //bunu hep yapmak lazim en başta
    return viewContainerRef.createComponent(comp); //depracate edildikten sonra kısaldı.
  }
}
export enum ComponentName{
  BasketsComponent
}