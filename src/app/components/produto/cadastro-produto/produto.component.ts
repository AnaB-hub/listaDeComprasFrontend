import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Mensagens } from 'src/utils/Mensagens.enum';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { ProdutoSugeridoService } from '../service/produto-sugerido.service';
import { Categoria } from '../../categoria/model/categoria';
import { Produto } from '../model/produto';

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
  categorias: Categoria[] = [];
  produtos: Produto[] = [];
  apresentarLista: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutoSugeridoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarComboCategoria();
  }

  inicializarFormulario(): void {
    this.cadastroForm = this.formBuilder.group({
      'id': [null],
      'nome': [null, Validators.required],
      'categoriaId': [null, Validators],
      'descricao': [null]
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
      this.service.cadastrar(produto).subscribe(_ => {
        this.mensagemParaUsuario('Obrigado pela sugestão!', true, 3000);
        this.limpar();
      });
    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
    }
  }

  limpar(): void {
    this.cadastroForm.reset();
  }

  sugerirCategoria(): void {
    window.open('/cadastro-categoria', '_blank');
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    scrollTo(0, 0);
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

}
