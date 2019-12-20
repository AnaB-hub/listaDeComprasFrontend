import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  // Categorias cadastradas no sistema - JSON SERVER
  // categoriasAtivas(): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.apiBaseUrl}/categorias`);
  // }

  // Categorias cadastradas no sistema - Backend Java
  categoriasAtivas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/categoriasAtivas`);
  }

  cadastrarCategoria(categoria) {
    return this.http.post(`${environment.apiBaseUrl}/categorias`, categoria);
  }

}
