import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http: HttpClient) { }

  // Backend em Java
  compras(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/compras`);
  }

  cadastrar(lista) {
    return this.http.post(`${environment.apiBaseUrl}/compras`, lista);
  }

  deletar(id) {
    return this.http.delete(`${environment.apiBaseUrl}/compras/${id}`);
  }

}
