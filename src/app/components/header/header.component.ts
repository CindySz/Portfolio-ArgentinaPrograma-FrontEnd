import { Component } from '@angular/core';
import { HostListener, Inject } from "@angular/core";
import { IsActiveMatchOptions } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public linkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };


  constructor(public auth: AuthService){ }

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number === 0) {
      document.querySelector('.headerScroll')?.classList.remove('filter');
    
  
    }else{
      document.querySelector('.headerScroll')?.classList.add('filter');
    
     }
    

  }

  logOut(){
    this.auth.logout();

  }
 
 
 

}
