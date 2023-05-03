import { getLocaleMonthNames } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {  Subject } from 'rxjs';

import { AuthService } from 'src/app/service/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  workExperience: any[] = [];
  experienceForm!: FormGroup;
  postForm!: FormGroup;
  editAddCompanyDetails: boolean[] = [];
  clickAdd:boolean=false;
  private unsubscribe = new Subject<void>();
  API_NAME="work-experiences"
 
 
  styles = {
    "background": "rgba( 250, 249, 249, 0.40 )",
    "box-shadow": "0 5px 10px 0 rgba( 31, 38, 135, 0.20 )",
    "backdrop-filter": "blur( 20px )",
    "-webkit-backdrop-filter": "blur( 20px )",
    "border-radius": "5px",
    "border": "1px solid rgba( 255, 255, 255, 0.18 )"
  };










  constructor(private crud: CrudService, public auth: AuthService, private readonly formBuilder: FormBuilder,  private cd: ChangeDetectorRef) {}


  ngOnInit(): void {


    

    this.getAll()
    
    this.experienceForm = this.formBuilder.group({
      expform: this.formBuilder.array([])
    })


    this.postForm = this.formBuilder.group({
      postform: this.formBuilder.array([
        this.createPostFormGroup(),
      ]),
    });
  


  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }



  getAll(){
    this.crud.getApi(this.API_NAME).subscribe(experience => {
   
this.workExperience = experience;
 
  //  console.log(this.workExperience);
   
      this.initExp();


    });
  }

  initExp() {
    const expWorkArray = this.experienceForm.get('expform') as FormArray;
   this.workExperience.forEach((item) => {
      expWorkArray.push(this.formBuilder.group({
        
        id:[item.id],
        img: [item.img],
        job: [item.job],
        date: [item.date],
        companyName: [item.companyName],
        description: [item.description]
      }));
    });
  }

 





  onDeleteExperience(experience: any) {

  
    this.crud.deleteApi(this.API_NAME, experience).subscribe(() => {
      this.workExperience = this.workExperience.filter(element => element.id !== experience.id)
    
    })


  }





  editCompanyDetails( i: number) {

    this.editAddCompanyDetails[i] = true;


  }


 

  cancelEditMode(item:any, i: number) {
    this.editAddCompanyDetails[i] = false;
    this.expform()['controls'][i].patchValue(item);
  }


  expform() {
 
    return this.experienceForm.get('expform') as FormArray;
  } 
  onSubmit(experience:any, i:number): void {

  
    // console.log(experience);
    // console.log(i);
    
    
    // console.log("sent");
    this.editAddCompanyDetails[i]=false;

   const exp= this.expform().value[i]

  
    this.crud.putApi(this.API_NAME, exp).subscribe({
      next:(data) => {
        console.log('Data updated successfully')
      },
      error:(err) => {
        console.log(err);
      }
    })


  }
//------------------------------------------------
  addJob(){
this.clickAdd=true;
  }

  cancelEditModePost(){
    this.clickAdd=false;
  }

   

  get postform(): FormArray {
    
    return this.postForm.get('postform') as FormArray;
  }  

 

  createPostFormGroup(): FormGroup {
    return this.formBuilder.group({
      img:'',
      job:'' ,
      date: '',
      companyName: '',
      description: ''
    });  
  }  

//TODO: ACTUALIZACIÓN DE LOS POST SIN TENER QUE RECARGAR PÁGINA
  onSubmitPost():void{
    this.clickAdd=false;
    const exp= this.postform.value[0]
    // console.log(exp);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

  
   
   
      this.crud.postApi(this.API_NAME,exp).subscribe({
      next:() => {
        // console.log('Data post successfully')
    
        this.postForm.reset();
     
    
       
        Toast.fire({
          icon: 'success',
          title: 'Se agregó con éxito la nueva experiencia de trabajo.',
         
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


