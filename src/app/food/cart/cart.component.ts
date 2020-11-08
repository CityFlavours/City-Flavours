import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
// import { AddressComponent } from '../../address.component';
import { ToastService } from '../../services/toast.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AddressComponent } from '../address/address.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  isCartButtonDisabled = false;
  constructor(private router: Router, private toastr: ToastService, private cartService: CartService, public modalController: ModalController) { }
  totalCost:number = 0;
  ngOnInit() {
    this.isCartButtonDisabled = false;
    var listOfItems = this.cartService.getItemsWithCount();
    listOfItems.forEach(
      (value) =>{
        this.totalCost += value.price * value.quantity;
      }
    )
  }

  confrimOrder(){
    this.cartService.confirmOrder();
  }
  async presentAddressModal() {
    const modal = await this.modalController.create({
      component: AddressComponent
    });
    return await modal.present();
  }

}

