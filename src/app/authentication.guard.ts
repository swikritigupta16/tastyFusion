import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardServiceService } from './auth-guard-service.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private AuthGuardServiceService: AuthGuardServiceService,
  private Router:Router){}
  canActivate():boolean{

    if(!this.AuthGuardServiceService.getToken()){
      Swal.fire({
  icon: 'error',
  title: 'Not Authorized!!!',
  text: 'You are not Logged In. Kindly Login with your credentials.' 
})
      //alert("You are not Logged In. First Login with your credential");
      this.Router.navigate(['/login']);     
    }      
      return this.AuthGuardServiceService.getToken();    
  }  
}