import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { resolve } from 'url';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoginRedirectService implements CanActivate  {

  constructor(private navCtrl: NavController,private loginService: LoginService,private router: Router, private storage: StorageService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean |Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.loginService.isLoggedIn().then((user) => {  
      if (user) {
        this.loginService.isLoggedIn().then(
          (isLoggedIn) =>{
            if(isLoggedIn)
            {
              this.storage.getObject("userDetails").then(
                (userDetail) => {
                  if(userDetail)
                  this.navCtrl.navigateRoot("/menu/dashboard");
                  else
                  this.navCtrl.navigateRoot("/detail");
                }
              )
            
            }
          }
        )
      resolve(false);
      } else {
      
      resolve(true);
      }
      });
      });
      }
}


