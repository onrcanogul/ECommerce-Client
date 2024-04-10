import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/common/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECommerce';

  constructor(private CustomToastr:CustomToastrService , public authService:AuthService , private router:Router) {

  }

  logout(){
    debugger;
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.CustomToastr.message("Logout is completed" , "Warning" , {messageType:ToastrMessageType.Warning , position:ToastrPosition.TopRight})
  }
}
