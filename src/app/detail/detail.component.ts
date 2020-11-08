import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map} from "rxjs/operators";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetailsFb, DropDownData } from 'src/app/utils/models';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
// import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { LoginService } from 'src/app/services/login.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  citiesCollection:AngularFirestoreCollection<DropDownData>;
  cities:any;
  detailsForm = new FormGroup({
    firstName: new FormControl("" ,[ Validators.required]),
    lastName: new FormControl(""),
    address1: new FormControl("",[Validators.required]),
    address2: new FormControl("",),
    latitude: new FormControl("" ),
    longitude: new FormControl(""),
    loggedUserType:new FormControl(10, [Validators.required]),
    finalTownId: new FormControl("", [Validators.required]),
    phoneNo:new FormControl("", [Validators.required]),
    checboxTermsAndConditions: new FormControl(false, [Validators.requiredTrue])

  })

  
  constructor(
    private storage: StorageService,private firestore: AngularFirestore,private router :Router, private loginService: LoginService , private toastr: ToastService ) {
  }


  ngOnInit() {
    this.citiesCollection = this.firestore.collection<any>('Citites');
    this.cities = this.citiesCollection.snapshotChanges().pipe(
      map(data => {
        return data.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        } );
      } 
      )     
      )
    }


  onTownSelected(city){ 
    city = city.target.value;
    console.log(city);
    this.detailsForm.get("finalTownId").setValue(city.value);
  }

  ionViewDidEnter(){
    this.fillFormWithPreviousDetails();
  }
  fillFormWithPreviousDetails(){
    this.loginService.isLoggedIn().then((user) => {
      if (!isNullOrUndefined(user)) {
       this.detailsForm.get("phoneNo").setValue(user.phoneNumber);
       this.firestore.collection("UserDetails").doc(user.phoneNumber).valueChanges().subscribe(
        (userDetail: any) =>{
          if(userDetail)
          {
            this.detailsForm.get("firstName").setValue(userDetail.firstName);
            this.detailsForm.get("lastName").setValue(userDetail.lastName);
            this.detailsForm.get("address1").setValue(userDetail.address1);
            this.detailsForm.get("address2").setValue(userDetail.address2);
            // this.detailsForm.get("latitude").setValue(this.loginService.getLocation().latitude)
            // this.detailsForm.get("longitude").setValue(this.loginService.getLocation().longitude);
            this.detailsForm.get("finalTownId").setValue(userDetail.townId);
            this.detailsForm.get("loggedUserType").setValue(userDetail.loggedUserType);
            this.detailsForm.get("checboxTermsAndConditions").setValue(true);
            
          }         
        }
       )}})
  }

  submitDetails(){
    let location = {
      latitude : this.detailsForm.controls.latitude.value,
      longitude :  this.detailsForm.controls.longitude.value
    }
    this.storage.getObject("user").then((user) => {
      if (user) {
        let detaislsToBeUpdated: UserDetailsFb = {
          address1: this.detailsForm.controls.address1.value,
          address2: this.detailsForm.controls.address2.value,
          firstName: this.detailsForm.controls.firstName.value,
          geolocation: location,
          lastName: this.detailsForm.controls.lastName.value,
          loggedUserType: this.detailsForm.controls.loggedUserType.value,
          townId: this.detailsForm.controls.finalTownId.value,
          userId:  user.uid,
          phoneNo : user.phoneNumber,
          isDisabled: false
        }
        this.firestore.collection("UserDetails").doc(detaislsToBeUpdated.phoneNo).set(detaislsToBeUpdated).then(
          (result) =>{
            this.router.navigateByUrl("/menu/dashboard");
            this.storage.setObject("userDetails" , detaislsToBeUpdated);                  
          }
        ).catch(
          (error)=>{
            console.log(error);
          }
        )
      } 
    }); 
  }
}
