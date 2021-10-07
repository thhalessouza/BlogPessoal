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

  token = {                                                                       //objeto
    headers: new HttpHeaders().set("Authorization", environment.token),   
  };

  

  getAllPostagens(): Observable<Postagens[]>{
    return this.http.get<Postagens[]>('https://thhalessouzablogpessoal.herokuapp.com/postagens', this.token)
  }

  postPostagens(postagens: Postagens): Observable<Postagens>{
    return this.http.post<Postagens>('https://thhalessouzablogpessoal.herokuapp.com/postagens', postagens, this.token)
  }

}
