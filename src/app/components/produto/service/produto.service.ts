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

  alterar(produto) {
    return this.http.put(`${environment.apiBaseUrl}/produtos/${produto.id}`, produto);
  }

  excluir(produtoId) {
    return this.http.delete(`${environment.apiBaseUrl}/produtos/${produtoId}`);
  }

  produtos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/produtos`);
  }

}
