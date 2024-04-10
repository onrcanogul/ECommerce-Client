import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr:CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.StatusCode)
      {
        case HttpStatusCode.Unauthorized:
        this.toastr.message("You are not authorized to perform this action.","Warning",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopFullWidth
        });
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
        })
        break;
      }


      return of();
    })
  )}
}
