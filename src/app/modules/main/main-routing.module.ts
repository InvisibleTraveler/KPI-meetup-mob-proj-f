import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

// pages
import { MainTabsPage } from 'src/app/pages/main-tabs/main-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MainTabsPage,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('../../pages/profile/profile.module').then(
            m => m.ProfilePageModule
          )
      },
      {
        path: 'meetings',
        loadChildren: () =>
          import('../../pages/meetings/meetings.module').then(
            m => m.MeetingsPageModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../../pages/settings/settings.module').then(
            m => m.SettingsPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
