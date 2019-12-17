import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  // Categoria sugerida
  cadastrarCategoriaSugerida(categoria) {
    return this.http.post(`${environment.apiBaseUrl}/categorias-sugeridas`, categoria);
  }

  carregarCategoriasSugeridas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/categorias-sugeridas`);
  }

  excluirCategoriaSugerida(categoria) {
    return this.http.delete(`${environment.apiBaseUrl}/categorias-sugeridas/${categoria}`);
  }

  // Categoria cadastrada no sistema
  categoriasAtivas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/categorias`);
  }
  cadastrarCategoria(categoria) {
    return this.http.post(`${environment.apiBaseUrl}/categorias`, categoria);
  }

}
