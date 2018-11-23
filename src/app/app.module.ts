import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EdiOPage } from '../pages/edi-o/edi-o';
import { ListaPage } from '../pages/lista/lista';
import { ConfigPage } from '../pages/config/config';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite'
import { NserviceProvider } from '../providers/nservice/nservice';
import { BancoDadosProvider } from '../providers/banco-dados/banco-dados';

@NgModule({
  declarations: [
    MyApp,
    EdiOPage,
    ListaPage,
    ConfigPage,
    TabsControllerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EdiOPage,
    ListaPage,
    ConfigPage,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NserviceProvider,
    SQLite,
    BancoDadosProvider
  ]
})
export class AppModule {}