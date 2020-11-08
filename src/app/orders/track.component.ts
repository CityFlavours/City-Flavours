import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LoginService } from '../services/login.service';
import { USER_TYPE } from '../utils/models';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  previousStatus = 0;
  orderStatusHtml = "";
  orderId: string = "";
  totalCost : number = 0;
  orderDetails: orderDetails = {
    status: 0,
    itemList: [],
    hotelName: "",
    userName: "",
    latitude: "",
    longitude: "",
    address: "",
    phoneNo: "",
    assingedTo:"",
    deliveryBoyPhoneNo: ""
  }
  backHref="/view/folder/Dashboard";
  userType = USER_TYPE;
  constructor(private toastr: ToastService,private storage: StorageService,private callNumber: CallNumber,private loginService:LoginService, private firestore:AngularFirestore , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let splitted = this.activatedRoute.snapshot.paramMap.get('id').split("-");
    this.orderId = splitted[0];
    this.firestore.collection("Orders").doc(this.orderId).valueChanges().subscribe(
      (order:any) =>{
        this.orderDetails.itemList = [];
        this.orderDetails.status = order.status;
        this.previousStatus = order.status;
        this.orderDetails.address = order.orderAddress;
        this.orderDetails.latitude = order.addressLatitude;
        this.orderDetails.longitude = order.addressLongitude;
        this.orderDetails.userName = order.userName;
        this.totalCost = 0;
        this.orderDetails.phoneNo = order.phoneNo;      
        this.orderDetails.hotelName = isNullOrUndefined(order.hotelName) ? "":order.hotelName;
        order.orderDetails.forEach( (element:string) => {
         let splitItems = element.split("-");
         let name = splitItems[0];
         let quantity = splitItems[1];
         let price = splitItems[2];
         this.orderDetails.itemList.push({name: name , price: price ,quantity : quantity}); 
         this.totalCost += (+price * +quantity);
        });
      }
    )
  }

  // changeStatus(event){
  //   if(this.previousStatus != event.target.value)
  //   {
  //   let statusToBeUpdated = event.target.value;
  //   if(statusToBeUpdated >= 2 )
  //   {
  //     {
  //     this.storage.getObject("userDetails").then(
  //       (detail) =>{
  //         this.firestore.collection("Orders").doc(this.orderId).update({"status" : +event.target.value , "assingedTo" : detail.phoneNo , "assingedToName" : detail.firstName+ " " + detail.lastName}).then(
  //           (success) =>{        
  //           }
  //         )
  //       }
  //     )
  //   }
  //   }
  // }
  // }

  // navigateLocation() {
    
  //   let options: LaunchNavigatorOptions = {
  //     start: [+this.orderDetails.latitude, +this.orderDetails.longitude],
  //     app: this.launchNavigator.APP.GOOGLE_MAPS
  //   };

  //   this.launchNavigator.navigate([+this.orderDetails.latitude, +this.orderDetails.longitude], options)
  //     .then(success => {
  //       console.log(success);
  //     }, error => {
  //       console.log(error);
  //     })
  // }

  callDeliverBoy(){
    this.callNumber.callNumber(this.orderDetails.deliveryBoyPhoneNo, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
    }
}

export class orderDetails {
  hotelName: string;
  itemList: any;
  status: number;
  userName : string;
  latitude: string;
  longitude: string;
  address: string;
  phoneNo:string;
  assingedTo:string;
  deliveryBoyPhoneNo:string;

}

