import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment.prod';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  isLogged:boolean = null;
  loggedUserType :number ;
  latitude: "";
  longtiude: "";
  constructor(private toastrService:ToastService , private storageService: StorageService, private router:Router) { 
    firebase.initializeApp(environment.firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.storageService.setObject("user",user);
        this.isLogged = true;
      } else {
        this.storageService.removeItem("userDetails");
        this.storageService.removeItem("user");
        this.isLogged = false;
        this.router.navigateByUrl("/login")
      }
    });
    }
   

   isLoggedIn(){ 
    return this.storageService.getObject("user");
   }

   signOut(){
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
}
