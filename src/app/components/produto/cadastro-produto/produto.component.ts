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
      this.service.cadastrar(this.cadastroForm.value).subscribe(_ => {
        this.mensagemParaUsuario('Produto cadastrado com sucesso!', true, 3000);
        this.limpar();
      });
    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
    }
  }

  limpar(): void {
    this.cadastroForm.reset();
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

}
