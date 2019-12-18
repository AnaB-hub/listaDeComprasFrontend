import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './cadastro-produto/produto.component';

const routes: Routes = [
  {
    path: 'operador/cadastro-produto',
    component: ProdutoComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
