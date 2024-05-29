import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { BasketsComponent } from './ui/components/baskets/baskets.component';
import { authGuard } from './guards/common/auth.guard';
import { adminGuard } from './guards/common/admin.guard';


const routes: Routes = [
    {path : "admin" , component: LayoutComponent, children:[
      { path:"" , component : DashboardComponent},
      {path : "customers", loadChildren : () => import("./admin/components/customers/customers.module").then(module => module.CustomersModule),canActivate:[authGuard,adminGuard]},
      {path: "orders" , loadChildren : () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule),canActivate:[authGuard,adminGuard]},
      {path : "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule),canActivate:[authGuard,adminGuard]},
      {path: "dashboard" , loadChildren:() => import("./admin/components/dashboard/dashboard.module").then(module => module.DashboardModule), canActivate:[authGuard,adminGuard]},
      {path: "users" , loadChildren:() => import("./admin/components/users/users.module").then(module => module.UsersModule), canActivate:[authGuard,adminGuard]},
      {path: "categories" , loadChildren:() => import("./admin/components/categories/categories.module").then(module => module.CategoriesModule), canActivate:[authGuard,adminGuard]},
      {path:"authorize-menu", loadChildren:() => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule),
        canActivate:[authGuard,adminGuard]
      },
      {path:"roles", loadChildren:() => import("./admin/components/roles/roles.module").then(module => module.RolesModule),
        canActivate:[authGuard]
      }
    ],canActivate:[authGuard,adminGuard]},
    {path:"" , component:HomeComponent},
    {path:"basket", loadChildren: () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
    {path:"products" , loadChildren:() => import("./ui/components/products/products.module").then(module => module.ProductsModule),},
    {path:"products/:categoryId/:pageNo" , loadChildren:() => import("./ui/components/products/products.module").then(module => module.ProductsModule),},
    
    {path:"register",loadChildren:() => import("./ui/components/register/register.module").then(module => module.RegisterModule)},
    {path:"login",loadChildren:() => import("./ui/components/login/login.module").then(module => module.LoginModule)},
    {path:"password-reset",loadChildren:() => import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule)},
    {path:"categories",loadChildren:() => import("./ui/components/categories/categories.module").then(module => module.CategoriesModule)},
    {path:"update-password/:userId/:resetToken", loadChildren:() => import("./ui/components/update-password/update-password.module").then(module => module.UpdatePasswordModule)},
    {path:"create-product", loadChildren:() => import("./ui/components/create-product/create-product.module").then(module => module.CreateProductModule) , canActivate:[authGuard]},
    {path:"list-products", loadChildren:() => import("./ui/components/list-product/list.module").then(module => module.ListModule) , canActivate:[authGuard]},
    {path:"list-orders", loadChildren:() => import("./ui/components/list-order/list-order.module").then(module => module.ListOrderModule) , canActivate:[authGuard]}
    
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
