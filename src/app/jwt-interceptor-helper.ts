import { Inject } from "@angular/core";
import { LocalStorageService} from "ngx-webstorage";

export function tokenGetter() {
    const localStorage : LocalStorageService = Inject(LocalStorageService)
    return localStorage.retrieve("accessToken")
  }
