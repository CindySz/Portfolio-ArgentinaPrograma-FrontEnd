import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { HomeComponent } from './pages/home/home.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { EducationComponent } from './pages/education/education.component';
import { SkillComponent } from './pages/skill/skill.component';
import { ProyectComponent } from './pages/proyect/proyect.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './pages/admin/admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutMeComponent,
    HomeComponent,
    ExperienceComponent,
    LogInComponent,
    EducationComponent,
    SkillComponent,
    ProyectComponent,
    ContactComponent,
    FooterComponent,
    AdminComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule


   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
