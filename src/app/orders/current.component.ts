import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  showProgressBar = false;
  OrderStatus = OrderStatus;
  currentUserPhone = "";
  isCurrent:boolean = false;
  orderList = [];
  constructor(private router : Router ,private firestore: AngularFirestore, private storage: StorageService , private snapshot: ActivatedRoute , private loginService: LoginService) { }
 
  ngOnInit() {
    this.storage.getObject("userDetails").then(
      (userDetails) => {
        this.currentUserPhone = userDetails.phoneNo;
        this.showProgressBar = true;
        var orderCollection = this.firestore.collection<OrderInfo>('Orders', ref => {
          let query: Query = ref;
          query = query.where('userId', '==', userDetails.userId);
          query = query.where('status', '<', 4);
          return query;
        });

        orderCollection.snapshotChanges().subscribe((data) => {
          this.orderList = [];
          data.map(
            (item) => {

              const data = item.payload.doc.data();
              const id = item.payload.doc.id;
              this.orderList.push({ ...data, id });

            }
          )
          this.orderList.sort((x, y) => {
            return Date.parse(y.date) - Date.parse(x.date);
          })

          this.showProgressBar = false;



        }
        )

      })} 


  goToOrderDetails(order){
    this.snapshot.url;
    this.router.navigateByUrl("menu/orders/tracking/" + order.id );
  }

}

export class OrderInfo {
  id: string;
  date: Date;
  hotelName: string;
  totalAmount: string;
  status: number;
  assingedToName : string;
  assingedTo:string
}

export const OrderStatus =  {
  1 : "Order placed",
  2 : "Order accepted",
  3 : "On the way",
  4 : "Delivered",
  5 : "Cancelled"
}
