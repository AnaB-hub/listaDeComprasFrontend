import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './cadastro-categoria/categoria.component';
import { CadastroCategoriaAdmComponent } from './cadastro-categoria-adm/cadastro-categoria-adm.component';

const routes: Routes = [
  {
    path: 'cadastro-categoria',
    component: CategoriaComponent
  },
  {
    path: 'adm/cadastro-categoria',
    component: CadastroCategoriaAdmComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
