import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './guard/auth.guard';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { HomeComponent } from './pages/home/home.component';
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
