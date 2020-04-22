import { Component, OnInit } from '@angular/core';
import { LoginService } from '../pagina-inicial/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.verificarIsAdm();
  }

  async verificarIsAdm() {
    let user = localStorage.getItem('user')
    if (user) {
      let result = await this.loginService.usuarioByUser(user).toPromise();
      if (result && result.isAdm)
        return;
      else
        this.router.navigate(['/login']);

    }
  }

}
