import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private localStorageService:LocalStorageService) { }

  get Token()
  {
    return localStorage.getItem('accessToken');
  }
}
