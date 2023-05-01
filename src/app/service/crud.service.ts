import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, Subject, delay, merge } from 'rxjs';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import { tap, map, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // private apiUrl='http://localhost:5000/workExperience'
  private apiUrlWorkExperience="http://localhost:8080/api/work-experiences"

  API_URL="http://localhost:8080/api"
  // private refresh=new Subject<void>();
  private refreshPost=new BehaviorSubject<void>(undefined);
  // private refreshGetExperience = new BehaviorSubject<void>(undefined);
  // get refreshGet(){
  //   return this.refresh;
  // }
  

 


  
  constructor(private http:HttpClient) { }

  getRefreshPost() {
    return this.refreshPost.asObservable();
  }

   
    // return  this.http.get<any[]>(this.apiUrlWorkExperience)
    

  

   postExperience(payload:any):Observable<any[]>{
    return this.http.post<any>(this.apiUrlWorkExperience, payload).pipe(
      tap(()=>{
      this.refreshPost.next();
    }))

    // return this.http.post<any>(this.apiUrlWorkExperience, payload)

    // return this.refreshPostExperience.pipe(
    //   switchMap(() => this.http.post<any[]>(this.apiUrlWorkExperience, payload))
    // );

   }

 
  // getRefreshGet() {
  //   return this.refreshGetExperience.asObservable();
  // }




   getApi(name:string):Observable<any[]>{
   
  
    return this.refreshPost.pipe(
      switchMap(() => this.http.get<any[]>(`${this.API_URL}/${name}`))
    );

    
  }

  

  deleteApi(name:any,idData:any):Observable<any[]>{
 
   return this.http.delete<any>(`${this.API_URL}/${name}/${idData.id}`)
    
  }
  postApi(name:any, payload:any):Observable<any[]>{
    return this.http.post<any>(`${this.API_URL}/${name}`, payload).pipe(
      tap(()=>{
      this.refreshPost.next();
    }))


   }

   putApi(name:any, payload:any):Observable<any[]>{
    const url= `${this.API_URL}/${name}/${payload.id}`
    return this.http.put<any>(url, payload)
     
   }


  
}
