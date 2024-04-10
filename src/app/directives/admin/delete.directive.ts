import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client-service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DialogData } from '../../dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from '../../services/common/dialog.service';
declare var $:any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private renderer:Renderer2,
    private element:ElementRef,
    private httpClientService:HttpClientService,
    private toastr : CustomToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    const img = renderer.createElement('img');
    renderer.setAttribute(img,"src","/assets/delete.png");
    renderer.setAttribute(img,"style","cursor : pointer");
    renderer.setAttribute(img,"width","25");
    renderer.setAttribute(img,"height","25");
    renderer.appendChild(element.nativeElement,img);
   }

   @Output() callback:EventEmitter<any> = new EventEmitter();
   @Input() controller:string;
   @Input() id : string;
   @HostListener("click")
   onClick()
   {

     this.dialogService.openDialog({
       componentType: DeleteDialogComponent,
       data: DialogData.Yes,
       callback: () => {
         this.spinner.show(spinnerType.BallClipRotatePulse)
         const td: HTMLTableCellElement = this.element.nativeElement;
         $(td.parentElement).fadeOut(1000, () => {
           this.callback.emit();
         });
         this.httpClientService.delete({
           controller: this.controller
         }, this.id).subscribe(result => {
           this.spinner.hide(spinnerType.BallClipRotatePulse)
           this.toastr.message("Product deleted succesfully", "Succesfull", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
         }, (errorResponse: HttpErrorResponse) => {
           this.spinner.hide(spinnerType.BallClipRotatePulse)
           this.toastr.message(errorResponse.message, "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
         })
      }
     })
      
      
      
      
   }









}

