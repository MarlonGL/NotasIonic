import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NserviceProvider } from '../../providers/nservice/nservice';
import { EdiOPage } from '../edi-o/edi-o';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public prov:NserviceProvider) {

  }
  SetTexto(cont:string, id:number){
    this.prov.texto = cont;
    this.prov.atual = id;
    console.log(this.prov.texto);
    this.navCtrl.setRoot(EdiOPage);

  }
  //<button ion-button block round color="light" (click) = "SetTexto(prov.notas[i].conteudo)">
  /*<ion-content>
    <button ion-item block round color="light">
        <span item-end>Button Item</span>
      </button>
</ion-content> */
}
