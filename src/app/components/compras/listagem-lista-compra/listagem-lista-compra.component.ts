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
  bodyExcluirListaCompra: string = '';
  compra: any;

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

  excluir(template): void {
    if (this.compra) {
      this.service.deletar(this.compra.id).subscribe(_ => {
        template.hide();
        this.mensagemParaUsuario('Lista excluída com sucesso', true, 3000);
        this.carregarCompras();
        this.compra = null;
      });
    }
  }

  openModal(template: any) {
    template.show();
  }

  excluirLista(compra: any, template: any) {
    this.openModal(template);
    this.compra = compra;
    this.bodyExcluirListaCompra = `Tem certeza que deseja excluir a lista: ${compra.nome}?`;
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
