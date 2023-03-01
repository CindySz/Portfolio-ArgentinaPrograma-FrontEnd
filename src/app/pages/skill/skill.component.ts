import { Component } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {

   skills:Array<any> =[{id:1, name: "Java",img:"../../../assets/img/java.jpg", alt: "Logo Java"},
   {id:2, name: "Javascript",img:"../../../assets/img/js.png", alt:"Logo JavaScript"},{id:3, name: "TypeScript",img:"../../../assets/img/ts.png", alt: "Logo TypeScript"},
   {id:4, name: "HTML",img:"../../../assets/img/html.png", alt:"Logo HTML"},{id:5, name: "CSS",img:"../../../assets/img/css.png", logo:"Logo CSS"},
   {id:6, name: "Bootstrap",img:"../../../assets/img/bootstrap.png", alt:"Logo Bootstrap"}, {id:7, name: "React",img:"../../../assets/img/react.png", alt:"Logo React"}, 
   {id:8, name: "Angular",img:"../../../assets/img/angular.png", alt:"Logo Angular"}, {id:9, name: "SQL",img:"../../../assets/img/sql.png", alt:"Logo MySQL"}];

}
