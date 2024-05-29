import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets/baskets.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateProductModule } from './create-product/create-product.module';
import { ListOrderModule } from './list-order/list-order.module';
import { CategoriesModule } from './categories/categories.module';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule,
    CreateProductModule,
    ListOrderModule,
    CategoriesModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
