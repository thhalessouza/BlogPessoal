import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagensService } from '../service/postagens.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

postagens: Postagens = new Postagens()
listaPostagens: Postagens[]

tema: Tema = new Tema()
listaTemas: Tema[]
idTema: number

usuario: Usuario = new Usuario()
idUsuario = environment.id
  

  constructor(
    private router: Router,
    private postagensService: PostagensService,
    private temaService: TemaService,
    private auth: AuthService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      
      this.router.navigate(['/entrar']);
    }

    this.auth.refreshToken();
    this.getAllTemas();
    this.getAllPostagens();
    
  }
     getAllTemas(){
       this.temaService.getAllTema().subscribe((resp: Tema[]) => {
       this.listaTemas = resp
     })

    }

    findByIdTema(){
      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
        this.tema = resp
      })
    }

      getAllPostagens(){
        this.postagensService.getAllPostagens().subscribe((resp: Postagens[])=>{
        this.listaPostagens = resp
        })
      }

      findByIdUsuario(){
      this.auth.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario)=>{
       this.usuario = resp
      
        })
      }
    

  publicar(){
  this.tema.id= this.idTema
  this.postagens.tema = this.tema

 this.usuario.id = this.idUsuario
 this.postagens.usuario = this.usuario

 this.postagensService.postPostagens(this.postagens).subscribe((resp: Postagens)=>{
   this.postagens = resp
   alert('Postagem realizada com sucesso!')
   this.postagens = new Postagens()
   this.getAllPostagens()
 })
  }
}