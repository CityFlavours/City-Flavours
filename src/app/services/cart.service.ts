import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ToastService } from './toast.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingService } from './loading.service';
import { ModalController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  hotelName : string = "";
  orderType : number  = 1;
  hotelId: string = "";
  hotelPhoneNumber: string = "";
  listItems = {};
  itemCount = 0;
  totalAmount = 0;
  setItemIndex = new Set<number>();
  deliverAddress: CartAddress = {
  address1 : "",
  address2 : "",
  latitude : "",
  longitude : ""
  } ;
  isAddressSelected: boolean = false;
  constructor(private loadingService:LoadingService, private router: Router, private toastr: ToastService, private fireStore: AngularFirestore , private storage: StorageService, private modalService:ModalController) { }
  

  initiateCart(orderType , hotelId , hotelName  , hotelPhoneNumber){
    this.resetCart();
    this.orderType = orderType ;
    this.hotelId = hotelId ;
    this.hotelName = hotelName;
    this.hotelPhoneNumber = hotelPhoneNumber;
  }
  addItem (item: CartItem , index: number , orderType? : number)
  {
    if(isNullOrUndefined(this.listItems[index]))
    {
      this.listItems[index] = { item : item , count : 1 }
      this.setItemIndex.add(index);
      this.itemCount++;
    }
    else{
      this.listItems[index].count++ ;
    }
    this.totalAmount += +item.itemPrice ;
    this.orderType = orderType;
    
  }
  removeItem (index: number)
  { 
    if(isNullOrUndefined(this.listItems[index]))
    {
      return;
    }
    else if(this.listItems[index].count == 1){
      this.totalAmount -= (+this.listItems[index].item.itemPrice);
      this.listItems[index] = undefined;
      this.setItemIndex.delete(index);
      this.itemCount--;
    }
    else if(this.listItems[index].count > 1)
    {
      this.totalAmount -= (+this.listItems[index].item.itemPrice);
      this.listItems[index].count--;
    }
   
  }

  getItemsWithCount()
  {
    let listOfSelectedItems = []
    this.setItemIndex.forEach(
      index =>{
        listOfSelectedItems.push( { name : this.listItems[index].item.itemName , price : this.listItems[index].item.itemPrice , quantity: this.listItems[index].count  });
      }
    )
    return listOfSelectedItems;
  }

  setCartAddress(latitude :string , longitude :string , address1: string , address2 :string){
    this.deliverAddress.address1 = address1;
    this.deliverAddress.address2 = address2;
    this.deliverAddress.latitude = latitude;
    this.deliverAddress.longitude = longitude;
    console.log(this.deliverAddress)
    this.isAddressSelected = true;
  }

  resetCart(){

    this.listItems = {};
    this.itemCount = 0;
    this.totalAmount = 0;
    this.setItemIndex = new Set<number>();
    this.deliverAddress.address1  =  "";
    this.deliverAddress.address2  =  "";
    this.deliverAddress.latitude  =  "";
    this.deliverAddress.longitude = "";
    this.isAddressSelected = false;

  }

  confirmOrder(){
    if(this.itemCount == 0)
    {
      return;
    }
    console.log(this.deliverAddress)
    this.storage.getObject("userDetails").then(
      (userDetail) =>{
        console.log(this.deliverAddress)
        this.loadingService.presentLoading();
        let detaislsToBeUpdated: orderDetails = {
          addressLongitude: this.deliverAddress.longitude,
          addressLatitude: this.deliverAddress.latitude,
          hotelId:  this.orderType == 1 ?  this.hotelId : "",
          orderAddress: this.deliverAddress.address1 + " , "+ this.deliverAddress.address2,
          orderType: 1 ,
          phoneNo: userDetail.phoneNo,
          status: 1,
          userId: userDetail.userId,
          userName: userDetail.firstName + " " + userDetail.lastName,
          orderDetails: [],
          hotelName:this.hotelName ,
          date: Date().toString(),
          totalAmount : this.totalAmount,
          hotelPhoneNumber: this.hotelPhoneNumber,
          townId: userDetail.townId,
          version: 2

        }
        detaislsToBeUpdated.orderDetails = [];
        this.getItemsWithCount().forEach((item) =>{
          detaislsToBeUpdated.orderDetails.push( item.name+ "-" + item.quantity + "-"+ item.price);
        })
        this.fireStore.collection("Orders").add(detaislsToBeUpdated).then(
          (success) =>{
            this.loadingService.dismissLoading();
            this.modalService.dismiss();
            this.router.navigateByUrl("/menu/orders/tracking/"+ success.id);
            this.resetCart();
          },
          (error)=>{
            this.loadingService.dismissLoading();
          }
        )
      }
    )
  }

}
export class CartItem{
  itemName: string;
  itemPrice: number;
}

export class CartAddress{
  address1: string;
  address2: string;
  latitude: string;
  longitude: string;
}
export class orderDetails{
  addressLongitude: string;
  addressLatitude: string;
  hotelId: string;
  orderAddress: string;
  orderType: number ;
  phoneNo: string;
  status: number;
  userId: string;
  userName: string;
  orderDetails: any;
  hotelName: string;
  date: any;
  totalAmount : number
  hotelPhoneNumber : string
  townId: string
  version: number
}
