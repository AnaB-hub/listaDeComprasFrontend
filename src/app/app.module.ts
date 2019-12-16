import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial/pagina-inicial.component';
import { PaginaInicialRoutingModule } from './components/pagina-inicial/pagina-inicial-routing.module';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginaInicialRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
