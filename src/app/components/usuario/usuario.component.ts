import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mensagens } from 'src/utils/Mensagens.enum';
import { LoginService } from '../pagina-inicial/service/login.service';

@Component({
  selector: 'app-produto',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  //formulário
  cadastroForm: FormGroup;

  //Váriaveis
  mensagem: string = '';
  classeMensagem: string = 'alert-success';

  isAdm: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  async ngOnInit() {
    this.inicializarFormulario();
    await this.verificarIsAdm();
  }

  async verificarIsAdm() {
    let user = localStorage.getItem('user')
    if (user) {
      let result = await this.loginService.usuarioByUser(user).toPromise();
      if (result)
        this.isAdm = result.isAdm;
    }
  }

  inicializarFormulario(): void {
    this.cadastroForm = this.formBuilder.group({
      'id': [null],
      'usuario': [null, Validators.required],
      'senha': [null, Validators.required],
      'isAdm': [false],
      'isOperador': [true]
    })
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    scrollTo(0, 0);
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      this.loginService.cadastro(this.cadastroForm.value).subscribe(result => {
        this.limpar();
        this.mensagemParaUsuario('Usuário cadastrado com sucesso', true, 5000);
      });
    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
    }
  }

  limpar(): void {
    this.cadastroForm.reset();
  }

}
