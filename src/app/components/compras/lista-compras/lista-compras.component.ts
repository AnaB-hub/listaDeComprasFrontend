import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../produto/service/produto.service';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  //listas
  produtos: any[] = [];
  categorias: any[] = [];
  produtosSelecionados: any[] = [];

  //strings
  classeMensagem: string = 'alert-success';
  mensagem: string ='';

  //formulário
  cadastroForm: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  async ngOnInit() {
    await this.carregarCategorias();
    await this.carregarListaProdutos();
  }

  async carregarCategorias(): Promise<void> {
    let categorias = await this.categoriaService.categoriasAtivas().toPromise();
    this.categorias = categorias;
  }

  async carregarListaProdutos(): Promise<void> {
    let produtos = await this.produtoService.produtos().toPromise();
    this.produtos = [];
    for (let i = 0; i < produtos.length; i++) {
      if (this.categorias && this.categorias.length > 0) {
        let categoria = this.categorias.find(x => x.id == produtos[i].categoria);
        categoria ? produtos[i].categoriaDescricao = categoria.nome : null;
        this.produtos.push(produtos[i]);
      }
    }
  }

  adicionarItemALista(produto): void {
    let prod = this.produtosSelecionados.find(x => x.nome == produto.nome);
    if (prod) {
      prod.qtde++;
    } else {
      produto.qtde = 1;
      this.produtosSelecionados.push(produto);
    }
  }

  excluir(produto): void {
    if (produto.qtde > 1) {
      let prod = this.produtosSelecionados.find(x => x.nome == produto.nome);
      prod.qtde--;
    } else {
      let index = this.produtosSelecionados.indexOf(produto);
      if (index >= 0) {
        this.produtosSelecionados.splice(index, 1);
      }
    }
  }

  limparLista(): void {
    this.produtosSelecionados = [];
    this.mensagemParaUsuario('Lista apagada com sucesso!', true, 3000);
  }

  salvarLista(): void {

  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

}
