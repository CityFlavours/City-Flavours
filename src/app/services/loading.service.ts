import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor( public loadingController: LoadingController) { }
   loading:any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner:"lines",
      cssClass: 'transparent'
    });
    await this.loading.present();
  }
  async dismissLoading(){
    await this.loading.dismiss();
  }
}
