import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial/pagina-inicial.component';
import { PaginaInicialRoutingModule } from './components/pagina-inicial/pagina-inicial-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { ProdutoRoutingModule } from './components/produto/produto-routing.module';
import { ProdutoComponent } from './components/produto/cadastro-produto/produto.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CategoriaComponent } from './components/categoria/cadastro-categoria/categoria.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriaRoutingModule } from './components/categoria/categoria-routing.module';
import { CadastroCategoriaAdmComponent } from './components/categoria/cadastro-categoria-adm/cadastro-categoria-adm.component';
import { LoginComponent } from './components/pagina-inicial/login/login.component';
import { ListaCompraRoutingModule } from './components/compras/lista-compra-routing.module';
import { ListaComprasComponent } from './components/compras/lista-compras/lista-compras.component';
import { ListagemListaCompraComponent } from './components/compras/listagem-lista-compra/listagem-lista-compra.component';
import { AprovarProdutoComponent } from './components/produto/aprovar-produto/aprovar-produto.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioRoutingModule } from './components/usuario/usuario-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    NavComponent,
    ProdutoComponent,
    CategoriaComponent,
    FooterComponent,
    CadastroCategoriaAdmComponent,
    LoginComponent,
    ListaComprasComponent,
    ListagemListaCompraComponent,
    AprovarProdutoComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginaInicialRoutingModule,
    ProdutoRoutingModule,
    CurrencyMaskModule,
    CategoriaRoutingModule,
    AlertModule.forRoot(),
    ListaCompraRoutingModule,
    UsuarioRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
