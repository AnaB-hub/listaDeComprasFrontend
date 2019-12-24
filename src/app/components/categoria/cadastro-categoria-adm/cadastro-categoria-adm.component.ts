import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaSugeridaService } from '../service/categoria-sugerida.service';

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

  rejeitar(categoriaId): void {
    this.categoriaSugeridaService.excluirCategoriaSugerida(categoriaId).subscribe(_ => {
      this.mensagemParaUsuario('Categoria rejeitada com sucesso', true, 5000);
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

  excluirCategoriaDaListaSugerida(id) {
    this.categoriaSugeridaService.excluirCategoriaSugerida(id).subscribe(_ => {
      this.carregarCategorias();
    });
  }

}
