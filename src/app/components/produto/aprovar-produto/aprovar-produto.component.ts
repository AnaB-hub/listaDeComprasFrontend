import { Component, OnInit } from '@angular/core';

import { ProdutoSugeridoService } from '../service/produto-sugerido.service';
import { ProdutoService } from '../service/produto.service';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { Produto } from '../model/produto';
import { Categoria } from '../../categoria/model/categoria';

@Component({
  selector: 'app-aprovar-produto',
  templateUrl: './aprovar-produto.component.html',
  styleUrls: ['./aprovar-produto.component.css']
})
export class AprovarProdutoComponent implements OnInit {

  // Variáveis
  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  classeMensagem: string = 'alert-succes';
  mensagem: string = '';

  constructor(
    private produtoService: ProdutoService,
    private produtoSugeridoService: ProdutoSugeridoService,
    private categoriaService: CategoriaService
  ) { }

  async ngOnInit() {
    await this.carregarListaCategoria();
    await this.carregarProdutos();
  }

  async carregarListaCategoria(): Promise<void> {
    let categorias = await this.categoriaService.categoriasAtivas().toPromise();
    this.categorias = categorias;
  }

  async carregarProdutos(): Promise<void> {
    let produtos = await this.produtoSugeridoService.produtos().toPromise();
    this.produtos = [];
    for (let i = 0; i < produtos.length; i++) {
      if (this.categorias && this.categorias.length > 0) {
        let categoria = this.categorias.find(x => x.id == produtos[i].categoriaId);
        categoria ? produtos[i].categoriaDescricao = categoria.nome : null;
      }
      this.produtos.push(produtos[i]);
    }
  }

  async aceitar(produto): Promise<void> {
    let id = produto.id;
    produto.id = null;
    produto.ativo = true;
    await this.produtoService.cadastrar(produto).toPromise();
    this.mensagemParaUsuario('Produto cadastrado com sucesso', true, 3000);
    await this.excluirProdutoDaListaSugerida(id);
  }

  rejeitar(produtoId): void {
    this.produtoSugeridoService.excluir(produtoId).subscribe(_ => {
      this.mensagemParaUsuario('Produto rejeitado com sucesso', false, 5000);
      this.carregarProdutos();
    });
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    scrollTo(0, 0);
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

  excluirProdutoDaListaSugerida(id): void {
    this.produtoSugeridoService.excluir(id).subscribe(_ => {
      this.carregarProdutos();
    });
  }

}
