import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/common/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { ComponentName, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { TokenService } from './services/common/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective , {static:true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(private CustomToastr:CustomToastrService , public authService:AuthService , private router:Router, private dynamicLoadComponentService:DynamicLoadComponentService,
  public tokenService:TokenService
  ) {
  }
  state:boolean;
  

  

  logout(){
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.CustomToastr.message("Logout is completed" , "Warning" , {messageType:ToastrMessageType.Warning , position:ToastrPosition.TopRight})
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentName.BasketsComponent , this.dynamicLoadComponentDirective.viewContanierRef)
  }
  

} 
