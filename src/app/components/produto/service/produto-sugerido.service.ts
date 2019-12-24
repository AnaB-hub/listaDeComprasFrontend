import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoSugeridoService {

  constructor(private http: HttpClient) { }

  // Backend com spring
  cadastrar(produto) {
    return this.http.post(`${environment.apiBaseUrl}/produtos-sugeridos`, produto);
  }

  // Backend com spring
  excluir(produtoId) {
    return this.http.delete(`${environment.apiBaseUrl}/produtos-sugeridos/${produtoId}`);
  }

  // Backend com spring - LISTA DE PRODUTOS SUGERIDOS
  produtos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/produtos-sugeridos`);
  }

}
