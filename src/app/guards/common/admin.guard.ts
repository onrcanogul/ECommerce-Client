import { CanActivateFn } from '@angular/router';
import { TokenService } from '../../services/common/token.service';
import { inject } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const tokenService:TokenService = inject(TokenService)
    const toastr:CustomToastrService = inject(CustomToastrService)

    if(tokenService.checkUserRole()){
      return true
    }
    else {
      toastr.message("You are not admin so you cant access to this route","Error",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
      return false;
    }
    



    return true
};
