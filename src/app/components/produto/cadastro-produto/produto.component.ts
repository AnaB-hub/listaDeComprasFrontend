import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';
import { Mensagens } from 'src/utils/Mensagens.enum';
import { CategoriaService } from '../../categoria/service/categoria.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  //formulário
  cadastroForm: FormGroup;

  //Váriaveis
  mensagem: string = '';
  classeMensagem: string = 'alert-success';
  categorias: any[] = [];
  produtos: any[] = [];
  apresentarLista: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarComboCategoria();
  }

  inicializarFormulario() {
    this.cadastroForm = this.formBuilder.group({
      'id': [null],
      'nome': [null, Validators.required],
      'categoria': [null, Validators],
      'descricao': [null],
      'ativo': [true]
    })
  }

  carregarComboCategoria(): void {
    this.categoriaService.categoriasAtivas().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      let produto = this.cadastroForm.value;
      if (produto.id) {
        this.service.alterar(produto).subscribe(_ => {
          this.mensagemParaUsuario('Produto alterado com sucesso!', true, 3000);
          this.limpar();
        });
      } else {
        this.service.cadastrar(produto).subscribe(_ => {
          this.mensagemParaUsuario('Produto cadastrado com sucesso!', true, 3000);
          this.limpar();
        });
      }
    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
    }
  }

  preencherFormularioEdicao(produto): void {
    if (produto) {
      this.cadastroForm.setValue({
        id: produto.id,
        nome: produto.nome,
        categoria: produto.categoria || null,
        descricao: produto.descricao  || null,
        ativo: produto.ativo
      });
    }
  }

  editar(produto): void {
    this.preencherFormularioEdicao(produto);
  }

  excluir(produtoId): void {
    if (produtoId) {
      this.service.excluir(produtoId).subscribe(_ => {
        this.mensagemParaUsuario('Produto excluído com sucesso!', true, 3000);
        this.carregarProdutos();
      });
    }
  }

  limpar(): void {
    this.cadastroForm.reset();
    this.carregarProdutos();
  }

  sugerirCategoria() {
    window.open('/cadastro-categoria', '_blank');
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

  apresentarProdutos(): void {
    this.carregarProdutos();
    this.apresentarLista = !this.apresentarLista;
  }

  async carregarProdutos(): Promise<void> {
    let produtos = await this.service.produtos().toPromise();
    this.produtos = [];
    for (let i = 0; i < produtos.length; i++) {
      if (this.categorias && this.categorias.length > 0) {
        let categoria = this.categorias.find(x => x.id == produtos[i].categoria);
        categoria ? produtos[i].categoriaDescricao = categoria.nome : null;
      }
      this.produtos.push(produtos[i]);
    }
  }

}
