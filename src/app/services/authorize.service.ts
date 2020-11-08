import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class AuthorizeService implements CanActivate  {

  constructor(private loginService: LoginService,private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean |Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.loginService.isLoggedIn().then((user) => {  
      if (user) {
      resolve(true);
      } else {
      this.router.navigate(['/login']);
      resolve(false);
      }
      });
      });
      }
}


