import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ApplicationService } from '../../../services/common/models/application.service';
import { Menu } from '../../../contracts/application-configurations/menu';
import { DialogService } from '../../../services/common/dialog.service';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrl: './authorize-menu.component.css'
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService , private applicationService : ApplicationService, private dialogService:DialogService) {
    super(spinner)   
  }
  async ngOnInit() {
    this.dataSource.data = (await this.applicationService.getAuthorizeDefinitionEndpoints()).map(m => {
      const treeMenu : TreeMenu = {
        name : m.name,
        actions : m.actions.map(a => {
          const _treeMenu : TreeMenu = {
            name : a.definition,
            code : a.code
          }
          return _treeMenu
        }),     
      }
      return treeMenu;
    });
  }
  private _transformer = (menu: TreeMenu, level: number) => {
    return {
      expandable: menu.actions?.length>0,
      name: menu.name,
      level: level,
      code: menu.code
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    menu => menu.level,
    menu => menu.expandable,
    menu => menu.actions,

  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  assignRole(code: string , name:string){
    this.dialogService.openDialog({
      componentType:AuthorizeMenuDialogComponent,
      data:{code,name},
      options : {
        width : "750px"
      },
      callback:() => {
        
      }
    })
  }

  

}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface TreeMenu {
  name ?:string,
  actions? :TreeMenu[],
  code? :string
}
