import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { OrderCompleteDialogComponent } from './order-complete-dialog/order-complete-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {AssignRoleDialogComponent } from './assign-role/assign-role-dialog.component';
import {MatListModule} from '@angular/material/list';




@NgModule({
  declarations: [DeleteDialogComponent, SelectProductImageDialogComponent, BasketItemRemoveDialogComponent, ShoppingCompleteDialogComponent, OrderDetailsDialogComponent, OrderCompleteDialogComponent, AuthorizeMenuDialogComponent, AssignRoleDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule,MatCardModule, MatTableModule, MatToolbarModule,MatBadgeModule,
    FileUploadModule,MatListModule
    
    
   ],

})
export class DialogModule { }
