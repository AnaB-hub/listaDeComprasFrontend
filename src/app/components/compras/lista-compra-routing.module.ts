import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { ListagemListaCompraComponent } from './listagem-lista-compra/listagem-lista-compra.component';


const routes: Routes = [
  {
    path: 'cadastrar-lista-de-compra',
    component: ListaComprasComponent
  },
  {
    path: 'lista-de-compra',
    component: ListagemListaCompraComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaCompraRoutingModule { }
