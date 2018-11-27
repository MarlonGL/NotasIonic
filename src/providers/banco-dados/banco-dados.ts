//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the BancoDadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BancoDadosProvider {
  //public http: HttpClient, 
  constructor(private sql:SQLite) {

  }
  public getDB() {
    return this.sql.create({
      name: 'notas4.db',
      location: 'default'
    });
  }
  public createDatabase() {
    this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTable(db);
 
         
      })
      .catch(e => console.log(e));
  }
  //nome, conteudo, data
  /*private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS notas (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, conteudo TEXT, data TEXT, id integer, FOREIGN KEY(category_id) REFERENCES categories(id))']
      //,['CREATE TABLE IF NOT EXISTS products (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate DATE, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))']
    ])
      .then(() => console.log('Tabela criada'))
      .catch(e => console.error('Erro ao cria a tabela', e));
  }*/
  createTable(db: SQLiteObject){
    let sql = 'CREATE TABLE IF NOT EXISTS notas(id INTEGER PRIMARY KEY, nome TEXT, conteudo TEXT, data TEXT, pos INTEGER)';
    return db.executeSql(sql, []);
  }

  

}
