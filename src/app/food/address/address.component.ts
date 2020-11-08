


import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { isNullOrUndefined } from 'util';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  defaultAddress: Address =
  {
    address1 : "",
    address2 : "",
    latitude : "",
    longitude : ""
  };

  addressForm = new FormGroup({
    address1: new FormControl("" ,[ Validators.required]),
    address2: new FormControl("",[ Validators.required])
  })
  constructor(private locationAccuracy: LocationAccuracy, private loadingController : LoadingController,private modalCtrl: ModalController,private toastrServcie: ToastService,private storage: StorageService, private cartService: CartService) { }

  ngOnInit() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });
    
   
    this.storage.getObject("userDetails").then(
      (user) => {
        this.defaultAddress.address1 = user.address1;
        this.defaultAddress.address2 = user.address2;
        this.defaultAddress.latitude = user.geolocation.latitude;
        this.defaultAddress.longitude = user.geolocation.longitude;
      }
    )
    }

    enterAddressAndContinue(isEntered :boolean)
    {
      this.getCurrentPosition().then(
        (coords) =>{
          if(!isNullOrUndefined(coords.coords.latitude) && !isNullOrUndefined(coords.coords.longitude))
          {
            if(!isEntered)
            {
              this.cartService.setCartAddress(
                coords.coords.latitude.toString(),
                coords.coords.longitude.toString(),
                this.defaultAddress.address1,
                this.defaultAddress.address2
              )
            }
            else{
              
              this.cartService.setCartAddress(
                coords.coords.latitude.toString(),
                coords.coords.longitude.toString(),
                this.addressForm.controls.address1.value,
                this.addressForm.controls.address2.value
              )
            }
          }
          else{
            if(!isEntered)
            {
              this.cartService.setCartAddress(
                "",
                "",
                this.defaultAddress.address1,
                this.defaultAddress.address2
              )
            }
            else{
              
              this.cartService.setCartAddress(
                "",
                "",
                this.addressForm.controls.address1.value,
                this.addressForm.controls.address2.value
              )
            }
          }


          this.cartService.confirmOrder();
        }
      ).catch(
        err =>{
          console.log(err)
          if(!isEntered)
            {
              this.cartService.setCartAddress(
                "",
                "",
                this.defaultAddress.address1,
                this.defaultAddress.address2
              )
            }
            else{
              
              this.cartService.setCartAddress(
                "",
                "",
                this.addressForm.controls.address1.value,
                this.addressForm.controls.address2.value
              )
            }
            this.cartService.confirmOrder();
        }
      )
      

     
      this.modalCtrl.dismiss();
    }

    async getCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition( {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600 });
      return coordinates;
    }

}

export class Address {
  latitude:string;
  longitude: string;
  address1: string;
  address2: string;
}
