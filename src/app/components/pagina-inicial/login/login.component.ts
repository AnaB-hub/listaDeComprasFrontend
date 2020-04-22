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

  limparLocalStore() {
    localStorage.clear();
  }

  entrar(): void {
    this.limparLocalStore();
    if (this.loginForm.valid) {
      let user = this.loginForm.value;
      this.loginService.usuarioByUser(user.usuario).subscribe(result => {
        if (result) {
          this.loginService.login({ 'user': user.usuario, 'senha': user.senha });
          this.setarLocalStorage(result);
        } else {
          this.mensagemParaUsuario('Usuário ou Senha inválidos.', false, 5000);
        }
      });
    } else {
      this.mensagemParaUsuario(Mensagens.CAMPO_OBRIGATORIO, false, 5000);
    }
  }

  setarLocalStorage(result): void {
    localStorage.setItem('user', result.username);
    this.mensagemParaUsuario('Usuário ou Senha inválidos.', false, 5000); //Caso os dados informados estejam certos, o user não verá essa mensagem
  }

  async verificarTipoUsuario(usuario) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user.isAdm) {
      this.router.navigate(['/adm/aprovar-produto']); 
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
