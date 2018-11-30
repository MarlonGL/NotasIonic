import { Component, ViewChild, ElementRef, Renderer, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NserviceProvider } from '../../providers/nservice/nservice';

@Component({
  selector: 'page-edi-o',
  templateUrl: 'edi-o.html'
})


export class EdiOPage implements OnInit {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  textz:string;
  
  //@ViewChild('txtArea', {read:ElementRef}) txt:ElementRef;
  
  constructor(public navCtrl: NavController, private servico:NserviceProvider, public alert:AlertController) {

    }
  

    ngOnInit() {
      
    }
    adicionar(nome:string){
    this.servico.addNota(nome, this.servico.texto);
    console.log(this.servico.notas);
    this.servico.select();

  }
  AbrirAlerta(){
    let addAlerta = this.alert.create({
      title:"Nome da nota",
      message:"Digite o nome",
      inputs:[{
        type:"text",
        name:"NomeInput"
      }],
      buttons:[{
        text:"Cancelar"
      },
      {
        text:"Adicionar Nota",
        handler: (data) =>{
          this.adicionar(data.NomeInput);
        }
      }]
    });
    addAlerta.present();
  }
  
  deletar(){
    this.servico.remove(this.servico.atual, this.servico.atNome);
    console.log('deletei');
    this.servico.select();
    this.servico.reset();
    this.servico.getItens();
  }
  AlertaDelete(){
    let addAlerta = this.alert.create({
      title:"Deletar?",
      message:"Tem certeza que quer deletar?",
      buttons:[{
        text:"Cancelar"
      },
      {
        text:"Deletar",
        handler: (data) =>{
          this.deletar();
        }
      }]
    });
    addAlerta.present();
  }
}
