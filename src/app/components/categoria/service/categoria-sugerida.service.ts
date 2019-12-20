import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSugeridaService {

  constructor(private http: HttpClient) { }

  cadastrarCategoriaSugerida(categoria) {
    return this.http.post(`${environment.apiBaseUrl}/categorias-sugeridas`, categoria);
  }

  carregarCategoriasSugeridas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/categorias-sugeridas`);
  }

  excluirCategoriaSugerida(categoria) {
    return this.http.delete(`${environment.apiBaseUrl}/categorias-sugeridas/${categoria}`);
  }

}
