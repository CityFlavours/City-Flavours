import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { LoginRedirectService } from './services/loginredirect.service.';
import { AuthorizeService } from './services/authorize.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { FcmService } from './services/fcm.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule , AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,AngularFirestoreModule  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginRedirectService,
    AuthorizeService,
    LocationAccuracy,
    FcmService,
    LaunchNavigator,
    CallNumber
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
