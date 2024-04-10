import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient, @Inject("baseUrl") private baseUrl:string) {}


  private url(requestParameters:Partial<RequestParameters>):string
  {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }
  //GET https://localhost7274/api?....
  get<T>(requestParameters : Partial<RequestParameters>,id?:string):Observable<T>
  {
    let url:string = "";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url=`${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;

      return this.httpClient.get<T>(url,{headers:requestParameters.header})
  }
  //POST https://localhost7274/api?...
  post<T>(requestParameters: RequestParameters, body:Partial<T>): Observable<T>
  {
    let url:string="";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
      url=`${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

    return this.httpClient.post<T>(url,body,{headers:requestParameters.header})
  }
  //PUT https://localhost7274/api?Name="ali"
  put<T>(requestParameters: Partial<RequestParameters>,body:Partial<T>):Observable<T>
  {
    let url:string ="";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
    url=`${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

    return this.httpClient.put<T>(url,body,{headers:requestParameters.header});
  }
    //DELETE https://localhost:7274/api/5?name="Ali"
  delete<T>(requestParameters:Partial<RequestParameters>, id:string) : Observable<T>
  {
    let url = "";
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}/${id}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

      return this.httpClient.delete<T>(url,{headers : requestParameters.header})
  }



}

export class RequestParameters{
  controller?:string;
  action?:string;
  queryString?:string;

  header?:HttpHeaders;
  baseUrl?:string;
  fullEndPoint? : string;

}
