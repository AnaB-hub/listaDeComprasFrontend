import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Mensagens } from 'src/utils/Mensagens.enum';
import { LoginService } from '../service/login.service';
import { User } from '../../usuario/model/user';
import { HttpResponse } from '@angular/common/http';

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

      this.loginService.usuarioByUser(user.usuario).subscribe(result => {
        if (result) {
          this.loginService.login({'user': user.usuario, 'senha': user.senha}).subscribe(result => {
            // console.log(result)
            // sessionStorage.setItem('LogedUser', result.headers.authorization);
            // sessionStorage.setItem('UsuarioLogin', user);
          })
          // .first((_, index) => index === 0, (response: HttpResponse<any>) => {});
        } else {
          this.mensagemParaUsuario('Usuário ou Senha inválidos.', false, 5000);
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
