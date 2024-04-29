import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { BasketsModule } from './components/baskets/baskets.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[ComponentsModule]
})
export class UiModule { }
