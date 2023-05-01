import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './pages/log-in/log-in.component';

const routes: Routes = [ 
  // { path: '', redirectTo:"/", pathMatch:"full" }, 
  // { path: '', component: HeaderComponent, children:[{path:'log-in', component: LogInComponent}] }
  // { path: 'home', component: HomeComponent },
  // { path: 'experience', component:ExperienceComponent},
{ path: 'log-in', component: LogInComponent },
// {path: 'admin',canActivate:[AuthGuard],component:AdminComponent}
// { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 50]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
