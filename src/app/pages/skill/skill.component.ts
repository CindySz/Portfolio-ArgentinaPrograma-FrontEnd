import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {

  styles = {
    "background": "rgba( 250, 249, 249, 0.40 )",
    "box-shadow": "0 5px 10px 0 rgba( 31, 38, 135, 0.20 )",
    "backdrop-filter": "blur( 20px )",
    "-webkit-backdrop-filter": "blur( 20px )",
    "border-radius": "5px",
    "border": "1px solid rgba( 255, 255, 255, 0.18 )"
  };

   
skillsArray: any[]=[];
addSkill:boolean=false;
postSkillForm!: FormGroup;
skillForm!: FormGroup;
API_NAME="skill"



   constructor(private crud: CrudService, public auth: AuthService, private readonly formBuilder: FormBuilder,  ) {}


   ngOnInit(): void {


this.getAllSkill();


this.skillForm = this.formBuilder.group({
  postSkillForm: this.formBuilder.array([
    this.createPostSkillFormGroup(),
  ]),
});
   }






   getAllSkill(){
    this.crud.getApi(this.API_NAME).subscribe(skill => {
   
  this.skillsArray = skill;


  
    });
  }








  deleteSkill(skill:any){
    this.crud.deleteApi(this.API_NAME,skill).subscribe(() => {
      this.skillsArray = this.skillsArray.filter(element => element.id !== skill.id)
    
    })

  }
  clickAddSkill(){
    this.addSkill=true;
  }

  cancelPostSkill(){
    this.addSkill=false;
  }


  get postform(): FormArray {
    
    return this.skillForm.get('postSkillForm') as FormArray;
  } 

  createPostSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      img:'' ,
      name: ''
    });  
  }  


  onSubmitPostSkill(){
    this.addSkill=false;
    const skill= this.postform.value[0]
    console.log(skill);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

  
   
   
      this.crud.postApi(this.API_NAME,skill).subscribe({
      next:(data:any) => {
        // console.log('Data post successfully')
    
        this.skillForm.reset();
     
    
       
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
