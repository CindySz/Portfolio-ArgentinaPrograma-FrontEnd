import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
  editAboutMe!:boolean;
  styles = {
    "background": "rgba( 250, 249, 249, 0.40 )",
    "box-shadow": "0 5px 10px 0 rgba( 31, 38, 135, 0.20 )",
    "backdrop-filter": "blur( 20px )",
    "-webkit-backdrop-filter": "blur( 20px )",
    "border-radius": "5px",
    "border": "1px solid rgba( 255, 255, 255, 0.18 )"
  };
 
  

  textAboutMe:string="";
  API_NAME="about-me"
  
 

  constructor(private crud: CrudService, public auth: AuthService){



  }

  ngOnInit(): void {
    this.crud.getApi(this.API_NAME).subscribe(text => {
     
    ;
      this.textAboutMe=text[0].description;
      
  ;

    });
  }


  edit(){
    this.editAboutMe=true;

  }

  cancelEditMode(){
    this.editAboutMe=false;
  }

  


  submitSaveEditMode(){

    this.editAboutMe=false;
    
    
   let formatRequest={id:1, description: this.textAboutMe}
      this.crud.putApi(this.API_NAME,formatRequest).subscribe(response => {
        console.log(response);})
    
     

  }






}
