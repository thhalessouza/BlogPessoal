import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagens } from 'src/app/model/Postagens';
import { Tema } from 'src/app/model/Tema';
import { PostagensService } from 'src/app/service/postagens.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

postagens: Postagens = new Postagens()

tema: Tema = new Tema ()
listaTemas: Tema[]
idTema: number


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagensService: PostagensService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
      
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagens(id)
    this.findAllTemas()
  }

  findByIdPostagens(id: number){
  this.postagensService.getByIdPostagens(id).subscribe((resp: Postagens)=> {
    this.postagens = resp
  })
  }

  findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=> {
    this.tema = resp
  })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

atualizar(){
this.postagensService.refreshToken()
this.tema.id = this.idTema
this.postagens.tema = this.tema

this.postagensService.putPostagens(this.postagens).subscribe((resp: Postagens) => {
this.postagens = resp
alert('Postagem atualizada com sucesso!')
this.router.navigate(['/inicio'])
})
}

}
