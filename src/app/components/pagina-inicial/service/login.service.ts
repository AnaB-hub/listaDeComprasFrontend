import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // Backend em Java
  usuarioByUser(usuario: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/usuario/findByUser/${usuario}`);
  }

}
