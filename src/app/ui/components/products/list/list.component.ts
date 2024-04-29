import { AfterViewInit, Component, ErrorHandler, Inject, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { ListProduct } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../../../services/common/models/basket.service';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute, 
    @Inject("azureStorage") public azureStorage:string,
    private basketService:BasketService,
    spinner:NgxSpinnerService,
    private toastr:CustomToastrService  
  ){
    super(spinner)
  }
  
  totalPageCount:number;
  totalProductsCount:number;
  currentPageNo:number;
  pageSize:number = 12;
  pageList:number[] = [];
  
  products : ListProduct[];
  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data = await this.productService.read(this.currentPageNo-1,this.pageSize,() => {},(error) => {})   
      debugger;
      this.products = data.products;        
     this.products.forEach(p => {
      if(p.productImageFiles.length>0)
        {
          p.productImageFiles.forEach(image => {
            if(image.showCase == true)
              p.path = image.path;
          })
        }    
     });     
        this.totalProductsCount = data.totalCount;
        this.totalPageCount = Math.ceil(data.totalCount / this.pageSize);        
        this.pageList = [];
        if(this.currentPageNo - 3 <= 0)
          for(let i = 1 ; i <= 7 ; i++) {
            if(i > this.totalPageCount)           
              break;      
        this.pageList.push(i);}
        else if(this.currentPageNo + 3 >= this.totalPageCount && this.totalPageCount > this.currentPageNo)
          for(let i = this.totalPageCount-6 ; i <= this.totalPageCount ; i++) this.pageList.push(i);
        else 
          for(let i = this.currentPageNo - 3 ; i <= this.currentPageNo + 3 ; i++) this.pageList.push(i);
    });
    
    
  }

  async addToBasket(product:ListProduct) {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    await this.basketService.add(
    {
      productId : product.id,
      quantity : 1
    });
    this.hideSpinner(spinnerType.BallClipRotatePulse);
    this.toastr.message("Product added to cart" , "Successful" , {messageType:ToastrMessageType.Success, position:ToastrPosition.TopRight})

  }

  

}

