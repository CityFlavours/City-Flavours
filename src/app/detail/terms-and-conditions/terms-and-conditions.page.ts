import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {

  termsList= [];
  refundList= [];
  constructor() { }

  ngOnInit() {
    this.termsList = [
      {heading:"1) You must not accept these terms if:" , content:"You are not lawfully entitled to use City Flavours website or App in the country in which you are located or reside.If you are not of legal age to bind agreement with us"},
      {
        heading:"2) If any change made to Terms &amp; Conditions:",
        content:"City Flavours team can modify Terms &amp; conditions at any time, in sole discretion. If City Flavours team  will be modifying any content, team will let you know either by site or through app. It's a major factor that you do agree to modified Terms &amp; conditions. If you don't agree to be bound by the modified Terms, then you can't use the services any more. Over Srvices are evolving over time we can change or close any services at any time without any notice, at our sole discretion."
      },
      {
        heading:"3) Privacy :",
        content:"Your privacy is very important to us. We will assure you that your any private data will not be disclosed anywhere at any cost. If you have any questions or concerns about terms and conditions, please contact us at support@CityFlavours.com"
      },{
        heading:"4) Legal Activity",
        content:"Do not use City Flavours to promote any illegal activities."
      },
      {
        heading:"5) Harmful Activities",
        content: "Do not distribute content that harms or interferes with the operation of the networks,Servers, or other infrastructure of City Flavours ."
      },
      {
        heading:"6) Hacking Personal Information",
        content:"Do not access other user’s account without their permission. Do not disturb other people’s personal information like email Id, passwords, play store or app store credentials without their permission. NOTE: In case of any illegal activities from user, we can block their account permanently."
      }
    ]

    this.refundList = [
      {
        heading: "1) For Restaurant Owner:", content:"IN case of payment did by mistake or in case of any payment related issues from Google Play Store or App Store, we are not entitled to refund any amount. If it’s very crucial and any genuine problem is seen in our system than we can look into it and resolve the issue or issue refund."      },
        {
          heading:"2) For Customer of Restaurant:",
          content:"IN case of payment did by mistake or in case of any payment related issues for food ordered with CityFlavours , we are not entitled to refund any amount. Restaurant Owner will be responsible for issue refund to customer for placed order in any case."
        },
        {
          heading:"3) Order Cancellation",
          content:"Once the food is prepared by the restruant the order cannot be cancelled in any case. The order can be cancelled only upon notification prior to the food preparation"
        },{
          heading:"4) Food Quality",
          content:"City Flavors is not responsible for any degradation of food quality. Any complaints regarding food quality has to be directly addressed to the concerned restaurant."
        },
        {
          heading:"5) Order approval",
          content:"Orders are subjected to be approved by the delivery boys or the restaurant according to their convenience. There is no assurance that if the order is placed it has to be accepted."
        }
    ]
  }

}
