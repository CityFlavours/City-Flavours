import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { StorageService } from '../services/storage.service';
import { ModalController } from '@ionic/angular';
import { PopoverComponent } from './front-advertisement/popover.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  showProgressBar: number = 0;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    effect: "slide",
    autoplay: true
    
  };
  slides = [ { heading:"Welcome to city flavours!" , body: "Now avail offers very cheap. Delivery charges only 10rs."}
  ];
  constructor(public modalController: ModalController,private fireStore : AngularFirestore,private storage : StorageService) {}


  ngOnInit(): void {

    this.storage.getObject("userDetails").then(
      (userDetails) => {
        //fire base call to fetch slides
        this.showProgressBar = 1;
        this.fireStore.collection("Slides",  ref => ref.where('townId', '==', userDetails.townId))
          .valueChanges().subscribe(
          (data: Array<any>)=>{
            if(data.length != 0)
            {
            this.slides = data;
            this.showProgressBar--;
            }
          },
          (err)=>{
           
          }
        )

        this.fireStore.collection("Advertiisement",  ref => ref.where('townId', '==', userDetails.townId))
          .valueChanges().subscribe(
          (data: Array<any>)=>{
            this.showProgressBar--;
            if(data.length == 1)
            { 
              if ( !(data[0].isUpdate && data[0].version <= 2)) {
                this.presentModal(data[0].imageUrl, data[0].isUpdate, data[0].version);
              }
              
            }
          },
          (err)=>{
            this.showProgressBar--;
          }
        )
      })  
  }

  async presentModal(url,isUpdate, version) {
    const modal = await this.modalController.create({
      component: PopoverComponent,
      componentProps: {
        'imageUrl': url,
        'isUpdate': isUpdate,
        'version': version
      }
    });
    return await modal.present();
  }


}
