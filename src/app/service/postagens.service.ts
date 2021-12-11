import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { Postagens } from '../model/Postagens';

@Injectable({
  providedIn: 'root'
})
export class PostagensService {

  constructor(private http: HttpClient) { }

  token = {                                                                       
    headers: new HttpHeaders().set('Authorization', environment.token)  
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };

    } 

  

  getAllPostagens(): Observable<Postagens[]>{
    return this.http.get<Postagens[]>('https://blogpessoaldothales.herokuapp.com/postagens', this.token)
  }

  getByIdPostagens(id: number): Observable<Postagens>{
    return this.http.get<Postagens>(`https://blogpessoaldothales.herokuapp.com/postagens/${id}`, this.token)
  }

  postPostagens(postagens: Postagens): Observable<Postagens>{
    return this.http.post<Postagens>('https://blogpessoaldothales.herokuapp.com/postagens', postagens, this.token)
  }

  putPostagens(postagens: Postagens): Observable<Postagens>{
    return this.http.put<Postagens>('https://blogpessoaldothales.herokuapp.com/postagens', postagens, this.token)
  }

  deletePostagens(id: number){
    return this.http.delete(`https://blogpessoaldothales.herokuapp.com/postagens/${id}`, this.token)
  }
}
