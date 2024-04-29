import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.css'
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> {
  constructor(dialogRef : MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeMenuState | any
  ) {
    super(dialogRef);
    
  }

}

export enum AuthorizeMenuState{
  Yes,No
}
