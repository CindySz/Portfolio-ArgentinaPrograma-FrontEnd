import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-frontEnd';

  constructor(
    private activateRoute:ActivatedRoute,
    private router: Router){}
  ngOnInit(){
    

    this.activateRoute.fragment.subscribe((value)=>{
      // console.log(value);

      this.jumpTo(value)

    });
  }

  jumpTo(section:any):void{
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'});
  }

  get getCurrentURL() {
    return this.router.url;
  }

 
}
