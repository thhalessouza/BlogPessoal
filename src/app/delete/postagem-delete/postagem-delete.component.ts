import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagens } from 'src/app/model/Postagens';

import { PostagensService } from 'src/app/service/postagens.service';

import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagens: Postagens = new Postagens()
  idPost: number
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagensService: PostagensService,
    

  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
      
      this.router.navigate(['/entrar']);
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagens(this.idPost)
    
  }

  findByIdPostagens(id: number){
  this.postagensService.getByIdPostagens(id).subscribe((resp: Postagens)=>{
    this.postagens = resp
  })
  }

 

apagar(){
this.postagensService.deletePostagens(this.idPost).subscribe(()=>{
  alert('Postagem apagada com sucesso!')
  this.router.navigate(['/inicio'])
})
}

}
