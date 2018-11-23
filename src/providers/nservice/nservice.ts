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

  constructor(private platform:Platform, private banco:BancoDadosProvider) {
    platform.ready().then(() => {
      banco.createDatabase();
      this.getItens();
      if(this.notas.length > 0) {
        this.texto = this.notas[0].conteudo;
        this.atual = 0;
      }
      
    });
    this.notas = [];
  }
  addNota(name:string, cont:string){
    let date = new Date().toLocaleDateString() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes();
    
    console.log(date);
    this.notas.push({nome:name, conteudo: cont, data: date});
    this.insert(name,cont,date, this.notas.length - 1);

  }
  addBancoDados(nomeN:string, conteu:string, date:string){
    
  }
  insert(nomeN:string, conteu:string, date:string, pos:number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        //let sql = 'insert into notas (nome, conteudo, data, id) values (nomeN,conteu, date)';
        let sql = 'insert into notas(nome, conteudo, data, pos) values (?,?, ?,?)';
        //(nome, conteudo, data, id)
        let data = [nomeN, conteu, date, pos];
        console.log('cheguei');
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
      
      //console.log('adicionado a tabela');
  }

  /*getItensSQL()
  {
    this.notas = this.banco.getItens();
  }*/

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
      });
    });
    console.log(this.notas);

  }

  public remove(id: number) {
    return this.banco.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from notas where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));

      
  }
}
