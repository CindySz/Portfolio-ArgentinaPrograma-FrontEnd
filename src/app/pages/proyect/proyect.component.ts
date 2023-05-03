import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent {

  styles = {
    "background": "rgba( 250, 249, 249, 0.40 )",
    "box-shadow": "0 5px 10px 0 rgba( 31, 38, 135, 0.20 )",
    "backdrop-filter": "blur( 20px )",
    "-webkit-backdrop-filter": "blur( 20px )",
    "border-radius": "5px",
    "border": "1px solid rgba( 255, 255, 255, 0.18 )"
  };

 proyectForm!: FormGroup;
 proyectFormArray!: FormGroup;
 proyectPostForm!:FormGroup;
 postProyectArrayForm!:FormGroup;
 proyectArray:any[] = [];
 editModeOn: boolean[] = [];
 addProyect:boolean=false;
 API_NAME="proyect"
 homeSpot="../../../assets/img/homespot.png"


  constructor(private crud: CrudService, public auth: AuthService, private readonly formBuilder: FormBuilder,  ) {}
  ngOnInit(): void {
    this.getAll()


    this.proyectForm = this.formBuilder.group({
      proyectFormArray: this.formBuilder.array([])
  })


  this.proyectPostForm = this.formBuilder.group({
    postProyectArrayForm: this.formBuilder.array([
      this.createPostProyectFormGroup(),
    ]),
  });
  }




  initProyectForm() {
    const proyectGet = this.proyectForm.get('proyectFormArray') as FormArray;
   this.proyectArray.forEach((item) => {
     proyectGet.push(this.formBuilder.group({
        
        id:[item.id],
        title: [item.title],
        img: [item.img],
        description: [item.description],
      
      }));
    });
  }
  

  getAll(){
    this.crud.getApi(this.API_NAME).subscribe(proyect => {
   
  this.proyectArray = proyect;
  this.initProyectForm()
  //  console.log(this.educationArray);
  
    });
  }

  deleteProyect(proyect: any) {
  
    this.crud.deleteApi(this.API_NAME,proyect).subscribe(() => {
      this.proyectArray= this.proyectArray.filter(element => element.id !== proyect.id)
    
    })
  
  
  }
  edit( i: number) {

    this.editModeOn[i] = true;
  
  
  }
  proyectform() {
 
    return this.proyectForm.get('proyectFormArray') as FormArray;
  } 

  cancelEditMode(item:any, i: number) {
    this.editModeOn[i] = false;
    this.proyectform()['controls'][i].patchValue(item);
  }



  onSubmitProyect(proyect:any, i:any):void{
    this.editModeOn[i]=false;

    const proyectValue= this.proyectform().value[i]
   
   
     this.crud.putApi(this.API_NAME,proyectValue).subscribe({
       next:() => {
        //  console.log('Data updated successfully')
       },
       error:(err) => {
         console.log(err);
       }
     })
}
//-------------------
clickAddProyect(){
  this.addProyect=true;
}

cancelPostProyect(){
  this.addProyect=false;
}


get postform(): FormArray {
    
  return this.proyectPostForm.get('postProyectArrayForm') as FormArray;
}  


createPostProyectFormGroup(): FormGroup {
  return this.formBuilder.group({
  title:'' ,
  img: '',
  description: '',
  linkCode: ''
  });  
} 

onSubmitPostProyect(){

  this.addProyect=false;
  const proyect= this.postform.value[0]
  // console.log(educ);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: true,
    
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


 
 
    this.crud.postApi(this.API_NAME,proyect).subscribe({
    next:(data:any) => {
      // console.log('Data post successfully')
  
      this.proyectPostForm.reset();
   
  
     
      Toast.fire({
        icon: 'success',
        title: 'Se agregó con éxito.',
       
      }).then(function(){ 
        location.reload();
        }
     );
     
     
    },
    error:(err) => {
      console.log(err);
    }
  })

}

}
