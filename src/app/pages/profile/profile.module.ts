import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// modules
import { IonicModule } from '@ionic/angular';

// pages
import { ProfilePage } from './profile.page';

// components
import { MeetingShortInfoComponent } from 'src/app/components/meeting-short-info/meeting-short-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage, MeetingShortInfoComponent]
})
export class ProfilePageModule {}
