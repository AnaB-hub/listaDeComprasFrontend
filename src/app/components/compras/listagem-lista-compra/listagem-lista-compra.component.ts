import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../service/compras.service';

@Component({
  selector: 'app-listagem-lista-compra',
  templateUrl: './listagem-lista-compra.component.html',
  styleUrls: ['./listagem-lista-compra.component.css']
})
export class ListagemListaCompraComponent implements OnInit {

  compras: any[] = [];

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

}
