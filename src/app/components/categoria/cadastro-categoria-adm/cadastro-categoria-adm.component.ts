import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-cadastro-categoria-adm',
  templateUrl: './cadastro-categoria-adm.component.html',
  styleUrls: ['./cadastro-categoria-adm.component.css']
})
export class CadastroCategoriaAdmComponent implements OnInit {

  categorias: any[] = [];

  classeMensagem: string = 'alert-succes';
  mensagem: string = '';

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  async carregarCategorias(): Promise<void> {
    let categorias = await this.categoriaService.carregarCategoriasSugeridas().toPromise();
    this.categorias = categorias;
  }

  async aceitar(categoria): Promise<void> {
    let id = categoria.id;
    categoria.id = null;
    categoria.ativo = true;
    this.categoriaService.cadastrarCategoria(categoria).subscribe(cat => {
      console.log(cat);
      this.mensagemParaUsuario('Categoria cadastrada com sucesso', true, 3000);
    });
    await this.excluir(id);
  }

  rejeitar(categoriaId): void {
    this.categoriaService.excluirCategoriaSugerida(categoriaId).subscribe(_ => {
      this.mensagemParaUsuario('Categoria rejeitada com sucesso', false, 5000);
      this.carregarCategorias();
    });
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

  excluir(id) {
    this.categoriaService.excluirCategoriaSugerida(id).subscribe(_ => {
      this.carregarCategorias();
    });
  }

}
