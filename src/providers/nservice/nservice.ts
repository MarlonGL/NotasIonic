//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime, Platform } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BancoDadosProvider } from '../banco-dados/banco-dados';

/*
  Generated class for the NserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface nota 
{
  nome:string,
  conteudo: string,
  data: string
}
@Injectable()
export class NserviceProvider {
  texto = 'nota';
  notas:nota[];
  atual:number;
  atNome:string;
  ordemLista:boolean;
  decrescenteLista:boolean;
  constructor(private platform:Platform, private banco:BancoDadosProvider) {
    platform.ready().then(() => {
      this.notas = [];
      banco.createDatabase();
      this.getItens();
      
    });
    
  }
  addNota(name:string, cont:string){
    let date = new Date().toLocaleDateString() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes();
    
    console.log(date);
    this.notas.push({nome:name, conteudo: cont, data: date});
    this.insert(name,cont,date, this.notas.length);

  }

  public remove(id: number, nom:string) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        //let sql = 'delete from notas where id = ?';
        let sql = 'delete from notas where nome = ?';
        let data = [nom];

        //let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
          
      })
      .catch((e) => console.error(e));

  }

  public select(){
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select nome, conteudo, data, pos from notas'
        db.executeSql(sql,[]).then((data) =>{
          for (let index = 0; index < data.rows.length; index++) {
                console.log(data.rows.item(index));            
          }
          console.log()
        })
      })
  }

  addBancoDados(nomeN:string, conteu:string, date:string){
    
  }
  insert(nomeN:string, conteu:string, date:string, pos:number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into notas(nome, conteudo, data, pos) values (?,?, ?,?)';
        let data = [nomeN, conteu, date, pos];
        console.log('cheguei');
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
      
      //console.log('adicionado a tabela');
  }
  getItens()
  {
    let itens = [];
    let n;
    let c;
    let d;

    this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM notas';
        return db.executeSql(sql,[]).then((r)=>{
          console.log('get chegei');
          if(r.rows.length > 0) {
            for (let i = 0; i < r.rows.length; i++) {
              //itens.push(r.res.rows.item(i));
              n = r.rows.item(i).nome;
              c = r.rows.item(i).conteudo;
              d = r.rows.item(i).data;
              
              
              this.notas.push({nome:n, conteudo: c, data: d});
            }
          }
      }).then(() =>{
        if(!this.ordemLista)
        {
          this.ordenarPorNome(this.decrescenteLista);

        }
        else{
          this.ordenarPorData(this.decrescenteLista);
        }
        console.log('ordenei no comeco');
        console.log(this.notas.length);
        if(this.notas.length > 0) {
          this.texto = this.notas[0].conteudo;
          console.log('texto recebeu' + this.texto + ' ' + this.notas[0].conteudo);
          this.atual = 0;
          this.atNome = this.notas[0].nome;
        }
      });
    });
    console.log(this.notas);

  }
  reset(){
    this.notas = [];
  }
  
  ordenarPorNome(decrescente:boolean){
    /*for (let index = 0; index < this.notas.length; index++) {
      const element = this.notas[index];
      
    }*/
    //this.notas.sort();
    if(!decrescente)
    {
      this.notas.sort(function(a, b){
        if(a.nome < b.nome) { return -1; }
        if(a.nome > b.nome) { return 1; }
        return 0;
    })
    } else {
      this.notas.sort(function(a, b){
        if(a.nome > b.nome) { return -1; }
        if(a.nome < b.nome) { return 1; }
        return 0;
    })
    }
   
  }
  ordenarPorData(decrescente:boolean){
    if(!decrescente)
    {
      this.notas.sort(function(a, b){
        if(a.data < b.data) { return -1; }
        if(a.data > b.data) { return 1; }
        return 0;
    })
    } else {
      this.notas.sort(function(a, b){
        if(a.data > b.data) { return -1; }
        if(a.data < b.data) { return 1; }
        return 0;
    })
    }
  }
}
