import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // Backend em Java
  usuarioByUser(usuario: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/usuario/findByUser/${usuario}`);
  }

  cadastro(usuario) {
    return this.http.post(`${environment.apiBaseUrl}/usuario`, usuario);
  }

  login(usuario) {
    return this.http.post<any>(`${environment.apiLogin}/login`, usuario);
  }

}
