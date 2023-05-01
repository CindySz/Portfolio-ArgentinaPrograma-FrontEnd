import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
   contactForm!:FormGroup;

   constructor(private readonly formBuilder:FormBuilder){

   }
   
   ngOnInit():void{
    this.contactForm=this.initForm();
   }

  onSubmit():void{
  

   if(this.contactForm.valid){
    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado!',
      timer: 1500,
      confirmButtonColor: '#c56869', 
    });

    this.contactForm.reset();

    // console.log("enviado");

    // console.log(this.contactForm.value);
    
    
    
    

  }
}

  initForm():FormGroup{
   
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      subject:['', Validators.required],
      message:['',[Validators.required, Validators.maxLength(500)]]
    });
    

  }

}
