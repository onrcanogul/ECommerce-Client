import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DialogModule } from '../../../dialogs/dialog.module';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';



@NgModule({
  declarations: [ProductsComponent, CreateComponent, ListComponent]
  ,
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "" , component : ProductsComponent}
    ]),
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    DeleteDirectiveModule
    
    
  ]
})
export class ProductsModule{
  
 }
