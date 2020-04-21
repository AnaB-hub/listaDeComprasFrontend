import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { ListagemListaCompraComponent } from './listagem-lista-compra/listagem-lista-compra.component';
import { AuthGuard } from '../auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'cadastrar-lista-de-compra',
    component: ListaComprasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lista-de-compra',
    component: ListagemListaCompraComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaCompraRoutingModule { }
