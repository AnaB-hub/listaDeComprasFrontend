import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent
  },
  {
    path: 'pagina-inicial',
    component: PaginaInicialComponent
  },
  {
    path: 'adm',
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaInicialRoutingModule { }
