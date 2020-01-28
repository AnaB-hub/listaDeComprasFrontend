import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Mensagens } from 'src/utils/Mensagens.enum';
import { LoginService } from '../service/login.service';

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
    this.loginForm = this.formBuilder.group({
      'usuario': [null, Validators.required],
      'senha': [null, Validators.required]
    });
  }

  entrar(): void {
    if (this.loginForm.valid) {
      // // TODO quando o login for implementado, retirar o mock
      // let formulario = this.loginForm.value;
      // if (formulario.usuario == 'adm' && formulario.senha == '123456') {
      //   this.router.navigate(['/adm/cadastro-categoria']);
      // } else if (formulario.usuario == 'op1' && formulario.senha == '123456'){
      //   this.router.navigate(['/operador/cadastro-produto']);
      // } else {
      //   this.mensagemParaUsuario('Usuário ou senha inválidos!', false, 3000);
      // }

      let user = this.loginForm.value;

      this.loginService.usuarioByUser(user.usuario).subscribe(result => {
        if (result) {
          alert('Teste')
        } else {
          this.mensagemParaUsuario('Usuário não encontrado!', false, 5000);
        }
      });

    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
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
