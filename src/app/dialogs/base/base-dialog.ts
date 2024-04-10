import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> {
    constructor(public dialogRef:MatDialogRef<DialogComponent>){}
    
    onNoClick(){
        this.dialogRef.close();
    }
}
