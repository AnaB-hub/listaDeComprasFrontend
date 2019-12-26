import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../produto/service/produto.service';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ComprasService } from '../service/compras.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  //listas
  produtos: any[] = [];
  produtosFiltrados: any[] = [];
  categorias: any[] = [];
  produtosSelecionados: any[] = [];

  //strings
  classeMensagem: string = 'alert-success';
  mensagem: string ='';
  nomeLista: string = '';

  //formulário
  cadastroForm: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private service: ComprasService
  ) { }

  //encapsulamente: acessa os metodos e não a variavel
  _filtroLista: string; //propriedade
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.produtosFiltrados = this.filtroLista ? this.filtrarProduto(this.filtroLista) : this.produtos;
  }

  async ngOnInit() {
    this.inicializarFormulario();
    await this.carregarCategorias();
    await this.carregarListaProdutos();
    this.produtosFiltrados = this.produtos;
  }

  filtrarProduto(filtrarPor: string){
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      produto => produto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  inicializarFormulario() {
    this.cadastroForm = this.formBuilder.group({
      'id': [null],
      'nome': [null, Validators.required],
      'produtos': [null]
    })
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
        let categoria = this.categorias.find(x => x.id == produtos[i].categoriaId);
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

  limparFiltro(): void {
    this.filtroLista = '';
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
    if (this.cadastroForm.valid) {
      let lista = this.cadastroForm.value;
      lista.produtos = this.produtosSelecionados;
      this.service.cadastrar(lista).subscribe(_ => {
        this.mensagemParaUsuario('Lista cadastrada com sucesso', true, 3000);
        this.resetarLista();
      });
    } else {
      this.mensagemParaUsuario('O campo Nome da Lista é obrigatório', false, 5000);
    }
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    scrollTo(0, 0);
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

  mudarTituloLista(nomeLista) {
    if (nomeLista) {
      this.nomeLista = nomeLista;
    } else {
      this.nomeLista = '';
    }
  }

  resetarLista(): void {
    this.cadastroForm.reset();
    this.mudarTituloLista(null);
    this.produtosSelecionados = [];
  }

}
