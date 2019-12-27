import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Mensagens } from 'src/utils/Mensagens.enum';
import { CategoriaSugeridaService } from '../service/categoria-sugerida.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  // Formulário
  cadastroForm: FormGroup;

  // Váriaveis
  mensagem: string = '';
  classeMensagem: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoriaSugeridaService: CategoriaSugeridaService
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.cadastroForm = this.formBuilder.group({
      'id': [null],
      'nome': [null, Validators.required],
      'ativo': [true]
    })
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      this.categoriaSugeridaService.cadastrarCategoriaSugerida(this.cadastroForm.value).subscribe(_ => {
        this.mensagemParaUsuario('Obrigada pela sugestão!', true, 3000);
        this.limpar();
      });
    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
    }
  }

  limpar(): void {
    this.cadastroForm.reset();
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
