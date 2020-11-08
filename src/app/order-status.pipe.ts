import { Pipe, PipeTransform } from '@angular/core';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    if(value == 1)
    {
      return '<ion-text color="primary">Order Placed. <br> Waiting for confirmation from vendor.</ion-text>' ;
    }
    if( value == 2)
    {
      return '<ion-text color="tertiary">Order accepted. <br>Your food is being prepared.</ion-text>' ;
    }
    if( value == 3)
    {
      return '<ion-text color="success">Your order is on the way. <br>You will receive a call shortly.</ion-text>' ;
    }
    if( value == 4)
    {
      return '<ion-text color="success">Your order has been delivered</ion-text>' ;
    }
    if( value == 5)
    {
      return '<ion-text color="success">Sorry your order has been cancelled</ion-text>' ;
    }
  }

}
