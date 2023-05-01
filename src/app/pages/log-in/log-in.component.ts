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
    

   
   }



onSubmit(): void {
  

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
    
    
      
    this.auth.login(this.loginForm.value).subscribe(
     {
      next: (result) => {
        console.log(result);
        Toast.fire({
          icon: 'success',
          title: 'Se ha logueado correctamente'
        })
        this.router.navigate(['/']);
      },
      error:(err: Error) => {
        alert(err.message);
      }
  });
  
}

  initForm():FormGroup{
   
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    

  }

}
