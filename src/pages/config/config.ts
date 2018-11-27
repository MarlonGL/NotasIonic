import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NserviceProvider } from '../../providers/nservice/nservice';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  ordem = false;
  decrescente = false;
  constructor(public navCtrl: NavController, private servico:NserviceProvider) {
    servico.ordemLista = this.ordem;
    servico.decrescenteLista = this.decrescente;
    //this.servico.ordenarPorNome(this.decrescente);
  }
  ordenacao(){
    //this.ordem != this.ordem;
    this.servico.ordemLista = this.ordem;
    this.servico.decrescenteLista = this.decrescente;

    if(this.ordem === false)
    {
      this.servico.ordenarPorNome(this.decrescente);
    }
    if(this.ordem === true){
      this.servico.ordenarPorData(this.decrescente);
    }
    console.log(this.ordem);
  }
}
