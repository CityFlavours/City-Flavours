import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartItem, CartService } from 'src/app/services/cart.service';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-tiffin-details',
  templateUrl: './tiffin-details.component.html',
  styleUrls: ['./tiffin-details.component.scss'],
})
export class TiffinDetailsComponent implements OnInit {
  @Input() tiffin:any;
  constructor(private modalController :ModalController, private cartService: CartService) { }
  ngAfterContentInit(){
    this.cartService.hotelName = this.tiffin.name;
    let item:CartItem = {
      itemName: this.tiffin.name,
      itemPrice: this.tiffin.price
    }
    this.cartService.addItem(item,0);
  }
  ngOnInit() {
  }
  checkOut(){

   this.presentAddressModal();
  }

  async presentAddressModal() {
    const modal = await this.modalController.create({
      component: AddressComponent
    });
    return await modal.present();
  }

  


}
