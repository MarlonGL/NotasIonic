import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EdiOPage } from '../edi-o/edi-o';
import { ListaPage } from '../lista/lista';
import { ConfigPage } from '../config/config';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = EdiOPage;
  tab2Root: any = ListaPage;
  tab3Root: any = ConfigPage;
  constructor(public navCtrl: NavController) {
  }
  
}
