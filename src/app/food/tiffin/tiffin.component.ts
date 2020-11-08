import { Component, OnInit } from '@angular/core';
import { AngularFirestore, Query  } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';
import { TiffinDetailsComponent } from './tiffin-details.component';

@Component({
  selector: 'app-tiffin',
  templateUrl: './tiffin.component.html',
  styleUrls: ['./tiffin.component.scss'],
})
export class TiffinComponent implements OnInit {
  listHotelData: any[];

  constructor(private router: Router,private storage: StorageService,private firestore: AngularFirestore, private cartService: CartService, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }
  isTiffin: boolean =false;
  showProgressBar: boolean = false;
  
  ngOnInit() {
    let param:string = this.activatedRoute.snapshot.paramMap.get('id');
    if(param == "tiffin")
    {
      this.isTiffin = true;
    }


    this.storage.getObject("userDetails").then(
      (user) =>{
        if(user)
        { 
          this.showProgressBar = true;
          var hotelCollection = this.firestore.collection<any>('TownTiffins', ref => {
            let query: Query = ref;
            query = query.where('townId', '==', user.townId);
            query = query.where('isTiffin', '==', this.isTiffin ? 1 : 0);
            return query;
          }); // isOpen == 1  means hotel is open
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


  async presentAddressModal(hotel) {
    const modal = await this.modalController.create({
      component: TiffinDetailsComponent,
      componentProps: {
        'tiffin': hotel
      }
    });
    return await modal.present();
  }

  goToMenuPage(hotelInfo){
    this.presentAddressModal(hotelInfo);
  }
  checkOut(){
    this.cartService.confirmOrder();
  }

}
