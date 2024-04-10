import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client-service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { FileUploadDialogComponent, FileUploadDialogData } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent extends BaseComponent{
  constructor(
    private httpClientService: HttpClientService,
    private toastr: CustomToastrService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    spinner:NgxSpinnerService
  ) { super(spinner)}
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;
  public dropped(files: NgxFileDropEntry[]) {
    
    this.files = files;
    const fileData: FormData = new FormData()
    for (const droppedFile of files) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        fileData.append(file.name, file, file.name);
      });
    }

      this.dialogService.openDialog({
        componentType: FileUploadDialogComponent,
        data: FileUploadDialogData.Yes,
        callback: () => {    
          this.showSpinner(spinnerType.BallClipRotatePulse)
            this.httpClientService.post({
              controller: this.options.controller,
              queryString: this.options.queryString,
              action: this.options.action,
              header: new HttpHeaders({ "responseType": "blob" })
            }, fileData).subscribe(data => {         
              this.toastr.message("File sending succesfull", "Successfull", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
              this.hideSpinner(spinnerType.BallClipRotatePulse)
            }, (errorResponse: HttpErrorResponse) => {     
              this.toastr.message("File upload failed", "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
              this.hideSpinner(spinnerType.BallClipRotatePulse)
            });
        }
      })
      
  }
  
}
export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString?:string;
  explanation?:string;
  accept?:string;
}

