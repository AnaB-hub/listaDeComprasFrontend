import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  cadastrar(produto) {
    return this.http.post(`${environment.apiBaseUrl}/produtos`, produto);
  }

  // JSON SERVE
  // alterar(produto) {
  //   return this.http.put(`${environment.apiBaseUrl}/produtos/${produto.id}`, produto);
  // }

  // Backend com spring
  alterar(produto) {
    return this.http.put(`${environment.apiBaseUrl}/produtos`, produto);
  }

  // JSON SERVE
  // excluir(produtoId) {
  //   return this.http.delete(`${environment.apiBaseUrl}/produtos/${produtoId}`);
  // }

  // Backend com spring
  excluir(produtoId) {
    return this.http.get(`${environment.apiBaseUrl}/produtos/delete/${produtoId}`);
  }

  // JSON SERVE - LISTA DE PRODUTOS
  // produtos(): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.apiBaseUrl}/produtos`);
  // }

  // Backend com spring - LISTA DE PRODUTOS
  produtos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/produtosAtivos`);
  }

}
