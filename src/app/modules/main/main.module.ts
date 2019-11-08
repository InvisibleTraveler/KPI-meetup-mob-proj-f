import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { IonicModule } from '@ionic/angular';
import { MainRoutingModule } from './main-routing.module';

// pages
import { MainTabsPage } from 'src/app/pages/main-tabs/main-tabs.page';

@NgModule({
  declarations: [MainTabsPage],
  imports: [CommonModule, IonicModule, MainRoutingModule]
})
export class MainModule {}
