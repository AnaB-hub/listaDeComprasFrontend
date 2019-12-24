import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './cadastro-produto/produto.component';
import { AprovarProdutoComponent } from './aprovar-produto/aprovar-produto.component';

const routes: Routes = [
  {
    path: 'operador/cadastro-produto',
    component: ProdutoComponent
  },
  {
    path: 'adm/aprovar-produto',
    component: AprovarProdutoComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
