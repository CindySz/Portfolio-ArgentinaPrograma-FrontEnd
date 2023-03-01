import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  loginForm!:FormGroup;

   constructor(private readonly formBuilder:FormBuilder,private auth: AuthService, private router: Router){

   }
   
   ngOnInit():void{
    this.loginForm=this.initForm();

    // if (this.auth.isLoggedIn()) {
    //   this.router.navigate(['/home']);
    // }
   }

//   onSubmit():void{
//     let result="";

//    if(this.contactForm.valid){
//     Swal.fire({
//       icon: 'success',
//       title: 'Mensaje enviado!',
//       timer: 1500,
//       confirmButtonColor: '#c56869', 
//     });

//     this.contactForm.reset();

//     console.log("enviado");
    

//   }
// }

onSubmit(): void {
  if (this.loginForm.valid) {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Se ha logueado correctamente'
    })
      
    this.auth.login(this.loginForm.value).subscribe(
     {
      next: (result) => {
        console.log(result);
        this.router.navigate(['/']);
      },
      error:(err: Error) => {
        alert(err.message);
      }
  });
  }
}

  initForm():FormGroup{
   
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    

  }

}
