import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, Subject, delay, merge } from 'rxjs';
import{HttpClient} from '@angular/common/http'
import { tap,  switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CrudService {


  API_URL="https://portfolio-backend-ams5.onrender.com/api"

  private refreshPost=new BehaviorSubject<void>(undefined);
  
  

 


  
  constructor(private http:HttpClient) { }

  getRefreshPost() {
    return this.refreshPost.asObservable();
  }

   

  


 
 


   getApi(name:string):Observable<any[]>{
   
  
    return this.refreshPost.pipe(
      switchMap(() => this.http.get<any[]>(`${this.API_URL}/${name}`))
    );

    
  }

  

  deleteApi(name:string,idData:any):Observable<any[]>{
 
   return this.http.delete<any>(`${this.API_URL}/${name}/${idData.id}`)
    
  }
  postApi(name:string, payload:any):Observable<any[]>{
    return this.http.post<any>(`${this.API_URL}/${name}`, payload).pipe(
      tap(()=>{
      this.refreshPost.next();
    }))


   }

   putApi(name:string, payload:any):Observable<any[]>{
    const url= `${this.API_URL}/${name}/${payload.id}`
    return this.http.put<any>(url, payload)
     
   }


  
}
