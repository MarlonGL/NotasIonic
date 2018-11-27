import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

/*import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';*/

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('#myTabs') tab:Tabs;

 /* tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;*/

  constructor() {

  }
  trocarTab(num:number){
    this.tab.select(num);
  }
}
