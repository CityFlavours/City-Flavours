import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() isUpdate: boolean;
  @Input() version:number;
  constructor(private modelController: ModalController) { }
  
  ngOnInit() {
    let currentVersion = 2;
    if(this.isUpdate && this.version <=currentVersion)
    {
      this.modelController.dismiss();
    }
  }

  update()
  { 
    window.open("https://play.google.com/store/apps/details?id=city.flavours.app");
  }

 

}
