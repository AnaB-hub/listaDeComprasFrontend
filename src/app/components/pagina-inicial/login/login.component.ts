import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Mensagens } from 'src/utils/Mensagens.enum';
import { LoginService } from '../service/login.service';
import { User } from '../../usuario/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Formulários
  loginForm: FormGroup;

  // Variáveis
  mensagem: string = '';
  classeMensagem: string = 'alert-success';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    localStorage.removeItem('user');
    this.loginForm = this.formBuilder.group({
      'usuario': [null, Validators.required],
      'senha': [null, Validators.required]
    });
  }

  entrar(): void {
    if (this.loginForm.valid) {

      let user = this.loginForm.value;

      this.loginService.usuarioByUser(user.usuario).subscribe(async result => {
        if (result) {
          if (user.senha == result.senha) {
            let usuario = new User(result.id, result.isAdm, result.isOperador);
            localStorage.setItem('user', JSON.stringify(usuario));
            await this.verificarTipoUsuario(usuario);
          } else {
            this.mensagemParaUsuario('Senha ou usuário inválidos!', false, 5000);
          }
        } else {
          this.mensagemParaUsuario('Usuário não encontrado!', false, 5000);
        }
      });

    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
    }
  }

  async verificarTipoUsuario(usuario) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.isAdm) {
      this.router.navigate(['/adm/aprovar-produto']);
    } else if (user.isOperador) {
      this.router.navigate(['/operador/cadastro-produto']);
    } else {
      this.router.navigate(['/cadastrar-lista-de-compra']);
    }
  }

  limpar(): void {
    this.loginForm.reset();
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
