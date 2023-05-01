import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {

  
  styles = {
    "background": "rgba( 250, 249, 249, 0.40 )",
    "box-shadow": "0 5px 10px 0 rgba( 31, 38, 135, 0.20 )",
    "backdrop-filter": "blur( 20px )",
    "-webkit-backdrop-filter": "blur( 20px )",
    "border-radius": "5px",
    "border": "1px solid rgba( 255, 255, 255, 0.18 )"
  };

 educationForm!: FormGroup;
 postEducationForm!: FormGroup;
 educationArray:any[] = [];
 editModeOn: boolean[] = [];
 addEducation:boolean=false;
 API_NAME="education"

 constructor(private crud: CrudService, public auth: AuthService, private readonly formBuilder: FormBuilder,  ) {}
 ngOnInit(): void {
  
  this.educationForm = this.formBuilder.group({
    educationFormArray: this.formBuilder.array([])
})

this.getAll();

this.postEducationForm = this.formBuilder.group({
  postEducationform: this.formBuilder.array([
    this.createPostEducationFormGroup(),
  ]),
});







}


initEducationForm() {
  const educationGet = this.educationForm.get('educationFormArray') as FormArray;
 this.educationArray.forEach((item) => {
    educationGet.push(this.formBuilder.group({
      
      id:[item.id],
      img: [item.img],
      title: [item.title],
      educationalEstablishment: [item.educationalEstablishment],
      date: [item.date]
    }));
  });
}


getAll(){
  this.crud.getApi(this.API_NAME).subscribe(education => {
 
this.educationArray = education;

//  console.log(this.educationArray);
 
    this.initEducationForm();


    
   
  

  });
}



cancelEditMode(item:any, i: number) {
  this.editModeOn[i] = false;
  this.educationform()['controls'][i].patchValue(item);
}

educationform() {
 
  return this.educationForm.get('educationFormArray') as FormArray;
} 

edit( i: number) {

  this.editModeOn[i] = true;


}

deleteEducation(education: any) {
  
  this.crud.deleteApi(this.API_NAME,education).subscribe(() => {
    this.educationArray= this.educationArray.filter(element => element.id !== education.id)
  
  })


}


onSubmit(education:any, i:number): void {

  
  // console.log(education);
  // console.log(i);
  
  
  // console.log("sent");
  this.editModeOn[i]=false;

 const educ= this.educationform().value[i]


  this.crud.putApi(this.API_NAME,educ).subscribe({
    next:() => {
      console.log('Data updated successfully')
    },
    error:(err) => {
      console.log(err);
    }
  })


}


//Post education----------------
clickAddEducation(){
  this.addEducation=true;
    }

    cancelEditPost(){
      this.addEducation=false;
    }


  

    createPostEducationFormGroup(): FormGroup {
      return this.formBuilder.group({
        img:'' ,
        title: '',
        educationalEstablishment: '',
        date: ''
      });  
    }  

    get postform(): FormArray {
    
      return this.postEducationForm.get('postEducationform') as FormArray;
    }  

    onSubmitPostEducation():void{
      this.addEducation=false;
      const educ= this.postform.value[0]
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
  
    
     
     
        this.crud.postApi(this.API_NAME,educ).subscribe({
        next:(data:any) => {
          // console.log('Data post successfully')
      
          this.postEducationForm.reset();
       
      
         
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
      })}





















}
