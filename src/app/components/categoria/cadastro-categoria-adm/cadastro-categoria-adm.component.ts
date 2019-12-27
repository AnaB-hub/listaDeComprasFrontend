import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../service/categoria.service';
import { CategoriaSugeridaService } from '../service/categoria-sugerida.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-cadastro-categoria-adm',
  templateUrl: './cadastro-categoria-adm.component.html',
  styleUrls: ['./cadastro-categoria-adm.component.css']
})
export class CadastroCategoriaAdmComponent implements OnInit {

  // Váriaveis
  categorias: Categoria[] = [];
  classeMensagem: string = 'alert-succes';
  mensagem: string = '';
  bodyRejeitarCategoria: string = '';
  categoria: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private categoriaSugeridaService: CategoriaSugeridaService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  async carregarCategorias(): Promise<void> {
    let categorias = await this.categoriaSugeridaService.carregarCategoriasSugeridas().toPromise();
    this.categorias = categorias;
  }

  async aceitar(categoria): Promise<void> {
    let id = categoria.id;
    categoria.id = null;
    categoria.ativo = true;
    let cat = await this.categoriaService.cadastrarCategoria(categoria).toPromise();
    this.mensagemParaUsuario('Categoria cadastrada com sucesso', true, 3000);
    await this.excluirCategoriaDaListaSugerida(id);
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    scrollTo(0, 0);
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

  rejeitar(template: any): void {
    if (this.categoria) {
      this.categoriaSugeridaService.excluirCategoriaSugerida(this.categoria.id).subscribe(_ => {
        template.hide();
        this.mensagemParaUsuario('Categoria rejeitada com sucesso', true, 5000);
        this.carregarCategorias();
        this.categoria = new Categoria();
      });
    }
  }

  openModal(template: any) {
    template.show();
  }

  rejeitarCategoria(categoria: Categoria, template: any) {
    this.openModal(template);
    this.categoria = categoria;
    this.bodyRejeitarCategoria = `Tem certeza que deseja rejeitar a categoria: ${categoria.nome}?`;
  }

  excluirCategoriaDaListaSugerida(id): void {
    this.categoriaSugeridaService.excluirCategoriaSugerida(id).subscribe(_ => {
      this.carregarCategorias();
    });
  }

}
