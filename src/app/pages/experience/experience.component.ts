import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  lista:Array<string>=["hola","que","tal","estas"];

  workExperience:Array<any> =[{id:1, job: "Ejecutiva de cuentas",companyName:"Banco Santander", 
  date:"06-2019/02-2021", description:"Por medios digitales, atención de una cartera de clientes del segmento individuos de renta alta (black y platinum):-Seguimiento de reclamos y requerimientos.-Manejo de mora y retención.-Gestión comercial."},
  {id:1, job: "Telemarketer",companyName:"Banco Santander", 
  date:"06-2015/06-2019", description:"-Atención al cliente (llamados IN y OUT). -Gestión comercial."}];

}
