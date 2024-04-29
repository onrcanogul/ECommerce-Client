import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-order-complete-dialog',
  templateUrl: './order-complete-dialog.component.html',
  styleUrl: './order-complete-dialog.component.css'
})
export class OrderCompleteDialogComponent extends BaseDialog<OrderCompleteDialogComponent> { 
  constructor(
    dialogRef:MatDialogRef<OrderCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderCompeleteState | string
  ) {
    super(dialogRef);
  }

}

export enum OrderCompeleteState{
  Yes,No
}
