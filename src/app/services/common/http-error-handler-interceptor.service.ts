import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';
import {  NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../base/base.component';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr: CustomToastrService, private userAuthService: UserAuthService, private router: Router , private spinner: NgxSpinnerService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      debugger;
      switch(error.status) {
        case HttpStatusCode.Unauthorized:

        

        this.userAuthService.refreshTokenLogin(localStorage.getItem('refreshToken'),(state) => {
          if(!state) {
              if(this.router.url == "/products") {
                this.toastr.message("You have to authorize to add entity to cart." , "Please log in", {
                  messageType:ToastrMessageType.Warning,
                  position:ToastrPosition.TopRight
                })
              }
              else 
              this.toastr.message("You are not authorized to perform this action.","Warning",{
                messageType:ToastrMessageType.Warning,
                position:ToastrPosition.TopFullWidth
              });
            }
        }).then(data => {});
      


        break;
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Server error.","Error",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopFullWidth
        });
        break;

        case HttpStatusCode.NotFound:
          this.toastr.message("Content is not found." , "Info",{
            messageType:ToastrMessageType.Info,
            position:ToastrPosition.TopFullWidth
          });
        break;

        default:
        this.toastr.message("An unexpected error was encountered","Error",{
          messageType:ToastrMessageType.Error,
          position:ToastrPosition.TopFullWidth
          });
        break;
      }
      this.spinner.hide(spinnerType.BallClipRotatePulse)
      return of(error);
    })
  )};
}
