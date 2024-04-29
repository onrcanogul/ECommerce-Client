import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule , UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut : 3000
    }),
    NgxSpinnerModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter : () => localStorage.getItem('accessToken'),
        allowedDomains : ["localhost:44382"]
      }
    }),
    SocialLoginModule,
    GoogleSigninButtonModule 
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide : "baseUrl" , useValue:"https://localhost:44382/api"},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("999500896979-bp49al527m65p5pp9ne0aj7kr4cqje0m.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide:HTTP_INTERCEPTORS , useClass : HttpErrorHandlerInterceptorService , multi:true},
    {provide:"azureStorage" , useValue:"https://miniecommercefiles.blob.core.windows.net"},
    {provide:"baseSignalRUrl" , useValue :"https://localhost:44382/"}
  ],
  bootstrap: [AppComponent]
})



export class AppModule {
 }
