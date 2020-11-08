import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { WindowService } from '../services/window.service';
import { environment } from 'src/environments/environment.prod';
import { ToastController, Platform, NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../services/storage.service';
import { LoginService } from '../services/login.service';
import { LoadingService } from '../services/loading.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  progressBarOn: boolean = false;
  recaptchaOn:boolean = true;
  windowRef: any;
  isCaptchaVerified: boolean = false;
  phoneNo: string = "";
  reCapcthaClass= {} ;
  otp= "";
  otpSubmitText = "Submit";
  constructor( private navCtrl: NavController, private loadingService: LoadingService,  private platform: Platform , private loginService: LoginService, private storage: StorageService,private router: Router, private win: WindowService, public toastController: ToastController, public toastservice: ToastService ) { }
  currentStep = "first";
  steps = 
    {
      first:{"title": "Welcome to","subtitle": "City Flavours"},
      second: {"title": "Step: 1/3" ,"subtitle": "Enter your phone "},
      third: {"title": "Step: 2/3" , "subtitle": "Verify captcha"},
      fourth: { "title": "Step: 3/3" , "subtitle": "Enter otp sent to :" }
    }


    ionViewWillEnter(){
      
    }
  changeStep(step: string){   
    if(step=="second")
    { 
      this.currentStep = step;    
    }
    if(step=="third")
    { 
      if(!(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(this.phoneNo)))
      {
        this.toastservice.presentToastWithOptions("","Enter a valid number", "top");
        return;
      }
      this.windowRef = this.win.windowRef;
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",{
        callback: (data =>{        
          this.changeStep("fourth");
        })
      })
      this.windowRef.recaptchaVerifier.render();
      this.currentStep = step;
    }
    if(step=="fourth")
    {      
      document.getElementById("recaptcha-container").style.visibility = "hidden";
      this.currentStep =  step;
      this.steps[this.currentStep].subtitle += " "+ this.phoneNo;
      const appVerifier = this.windowRef.recaptchaVerifier;
      const num = "+91" + this.phoneNo;
      firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {
                this.windowRef.confirmationResult = result;
            })
            .catch( error => console.log(error) );
     }  
  }
  verifyOtp() {
    this.progressBarOn = true;
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then(result => {
        this.progressBarOn = false;
        this.router.navigateByUrl("/detail")

      }, err => {
        this.toastservice.presentToastWithOptions("Invalid Otp", "Try again", "top");
        this.otp = "";
        this.progressBarOn = false;
      }
      ).catch(
      );
  }

}
