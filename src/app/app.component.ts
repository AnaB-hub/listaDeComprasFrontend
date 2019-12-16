import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'listaDeCompras';
  bodyDeletarEvento: any;

  confirmeDelete(template: any) {
    alert('Teste')
  }

  excluirEvento(evento: any, template: any) {
    this.openModal(template);
    this.bodyDeletarEvento = `Tem certeza que deseja excluir?`;
  }

  openModal(template: any) {
    template.show();
  }
}
