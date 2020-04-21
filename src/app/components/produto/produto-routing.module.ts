import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './cadastro-produto/produto.component';
import { AprovarProdutoComponent } from './aprovar-produto/aprovar-produto.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'operador/cadastro-produto',
    component: ProdutoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adm/aprovar-produto',
    component: AprovarProdutoComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
