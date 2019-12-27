import { Component, OnInit } from '@angular/core';

import { ComprasService } from '../service/compras.service';

@Component({
  selector: 'app-listagem-lista-compra',
  templateUrl: './listagem-lista-compra.component.html',
  styleUrls: ['./listagem-lista-compra.component.css']
})
export class ListagemListaCompraComponent implements OnInit {

  // Variáveis
  compras: any[] = [];
  mostrarLista: boolean = true;
  classeMensagem: string = '';
  mensagem: string = '';

  constructor(
    private service: ComprasService
  ) { }

  ngOnInit() {
    this.carregarCompras();
  }

  carregarCompras(): void {
    this.service.compras().subscribe(compras => {
      this.compras = compras;
      console.log(compras)
    });
  }

  excluir(id): void {
    this.service.deletar(id).subscribe(_ => {
      this.mensagemParaUsuario('Lista excluída com sucesso', true, 3000);
      this.carregarCompras();
    });
  }

  mensagemParaUsuario(mensagem: string, sucesso: boolean, timeout: number): void {
    scrollTo(0, 0);
    sucesso ? this.classeMensagem = 'alert-success' : this.classeMensagem = 'alert-danger';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.mensagem = '';
    }, timeout);
  }

}
