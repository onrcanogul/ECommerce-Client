import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DialogModule } from '@angular/cdk/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    DeleteDirectiveModule,
    RouterModule.forChild([
      {path:"",component:ListComponent}
    ])
  ]
})
export class ListModule { }
