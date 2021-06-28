import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./popover-viewer/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./popover-viewer/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'memories',
    loadChildren: () => import('./popover-viewer/memories/memories.module').then( m => m.MemoriesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./popover-viewer/settings/settings.module').then( m => m.SettingsPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
