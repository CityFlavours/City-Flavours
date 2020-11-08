import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  styleUrls: ['./hotel-list.component.scss'],
  selector: 'app-hotel-menu',
  templateUrl: './hotel-menu.component.html'
})
export class HotelMenuComponent implements OnInit {
  showProgressBar:boolean = false;
  itemIndex = 0;
  title:string ;
  hotelId: string ;
  menuData= {};
  menuDataNonVeg = {};
  subMenuNonVeg = [];
  subMenu = [];
  constructor(private toastrService: ToastService, private router:Router,private activatedRoute: ActivatedRoute , private firestore: AngularFirestore ,private cartService: CartService ) { }

  ngOnInit() {
    this.showProgressBar = true;
    this.hotelId = this.activatedRoute.snapshot.paramMap.get('id').split("-")[0] ;
    this.title = this.activatedRoute.snapshot.paramMap.get('id').split("-")[1]; 
    var menuRef =this.firestore.collection('TownHotels').doc(this.hotelId).collection("Menu");
    menuRef.doc("Veg").valueChanges().subscribe(
      (data:any) =>{
        const unordered = data;    
        const ordered = {};
        Object.keys(unordered).sort().forEach(function(key) {
          ordered[key] = unordered[key];
        });
        Object.entries(ordered).forEach((menuItem:any) =>{
          let splittedItem = menuItem[1].split("-");
          let subMenu = splittedItem[0];
          let price = splittedItem[1];
          if(this.menuData.hasOwnProperty(SUB_MENU_CONSTANTS[subMenu]))
            {
              this.menuData[SUB_MENU_CONSTANTS[subMenu]].push({ name: menuItem[0] , price: price , count: 0 , index : this.itemIndex++});
            }
            else{
              this.subMenu.push(SUB_MENU_CONSTANTS[subMenu]);
              this.menuData[SUB_MENU_CONSTANTS[subMenu]] = [];
              this.menuData[SUB_MENU_CONSTANTS[subMenu]].push({ name: menuItem[0] , price: price , count: 0 , index : this.itemIndex++});
            }
        })
        this.showProgressBar = false;
      }  )
      menuRef.doc("NonVeg").valueChanges().subscribe(
        (data:any) =>{
          const unordered = data;
          const ordered = {};
          Object.keys(unordered).sort().forEach(function (key) {
            ordered[key] = unordered[key];
          });

          Object.entries(ordered).forEach((menuItem:any) =>{
            let splittedItem = menuItem[1].split("-");
            let subMenu = splittedItem[0];
            let price = splittedItem[1];
            if(this.menuDataNonVeg.hasOwnProperty(SUB_MENU_CONSTANTS[subMenu]))
              {
                this.menuDataNonVeg[SUB_MENU_CONSTANTS[subMenu]].push({ name: menuItem[0] , price: price , count: 0 , index : this.itemIndex++});
              }
              else{
                this.subMenuNonVeg.push(SUB_MENU_CONSTANTS[subMenu]);
                this.menuDataNonVeg[SUB_MENU_CONSTANTS[subMenu]] = [];
                this.menuDataNonVeg[SUB_MENU_CONSTANTS[subMenu]].push({ name: menuItem[0] , price: price , count: 0 , index : this.itemIndex++});
              }
          }) 
        })
      
  }

   addToCart(item){
     if(this.cartService.itemCount == 10)
     {
      this.toastrService.presentToastWithOptions("Wait" , "Maximum 10 items allowed", "top");
      return;
     }
    let newItem:CartItem ={
      itemName : item.name,
      itemPrice : item.price
    }
    item.count++;
    this.cartService.addItem(newItem , item.index);
  }
  removeFromCart(item){
    if(item.count > 0){
    item.count--;
    this.cartService.removeItem(item.index);
    }
  }
  checkOut(){
    this.router.navigateByUrl("/menu/food/cart");
  }

}


 


  export const SUB_MENU_CONSTANTS = {
    1: "Chickhen",
    2: "Mutton",
    3:"Paneer",
    4:"Veggies",
    5:"Roti",
    10: "Dessert",
    13: "Sweet",
    8: "Mushroom",
    9: "Rice",
    11: "Chineese",
    12: "Salad",
    14: "Paratha",
    15: "Rayata",
    16: "Noodles",
    17: "Cutlet",
    18: "Juice",
    19: "Soup",
    20: "Main course",
    21: "Breakfast",
    22: "Sandwich",
    23:"Pizza",
    24: "Snacks",
    25: "Snacks",
    26: "Dal",
    27: "Fish",
    28: "Egg",
    29: "Briyani",
    30: "Chana",
    31: "Cake",
    33:"Cold drinks",
    34: "aSpecial",
    35: "Starter",
    100:"Others"
  }




