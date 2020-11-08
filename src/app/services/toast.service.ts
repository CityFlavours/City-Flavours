import { Component, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
  })
export class ToastService {

  constructor(public toastController: ToastController) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Connectivity problem',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(header, message , position) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      position: position,
      duration: 2000,
      color: "light"
    });
    toast.present();
  }

}