import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './cadastro-categoria/categoria.component';
import { CadastroCategoriaAdmComponent } from './cadastro-categoria-adm/cadastro-categoria-adm.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'cadastro-categoria',
    component: CategoriaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adm/aprovar-categoria',
    component: CadastroCategoriaAdmComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
