import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent implements OnInit {
  showProgressBar: boolean= false;
  constructor(private router: Router,private storage: StorageService,private firestore: AngularFirestore, private cartService: CartService) { }
  listHotelData: Array<any> = [];
  ngOnInit() {

    this.storage.getObject("userDetails").then(
      (user) =>{
        if(user)
        { 
          this.showProgressBar = true;
          var hotelCollection = this.firestore.collection<any>('TownHotels', ref => ref.where('townId', '==', user.townId)); // isOpen == 1  means hotel is open
          hotelCollection.snapshotChanges().subscribe(
            (data) => {
              this.listHotelData= [];
              data.map(
                (item) => {
                  
                  const data = item.payload.doc.data();
                  const id = item.payload.doc.id;
                  this.listHotelData.push({ ...data, id });
                    }                
              )
              this.listHotelData.sort((x , y) => y.isOpen - x.isOpen )
              this.showProgressBar = false;
            }, (err) =>{
              this.showProgressBar = false;;
            } )
        }
      })
    }

    goToMenuPage(hotelInfo)
    {
      if(hotelInfo.isOpen == 0)
      return;
      this.cartService.initiateCart(1, hotelInfo.id , hotelInfo.name , hotelInfo.phoneNo);
      this.router.navigateByUrl("/menu/food/hotel/" + hotelInfo.id + "-" + hotelInfo.name );
    }
  }

