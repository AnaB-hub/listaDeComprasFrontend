import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  // Backend em Java
  usuarioByUser(usuario: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/usuario/findByUser/${usuario}`);
  }

  cadastro(usuario) {
    return this.http.post(`${environment.apiBaseUrl}/usuario`, usuario);
  }

  login(usuario) {
    return this.http.post<any>(`${environment.apiLogin}/login`, usuario, {observe: 'response'}).subscribe(async resp => {
      if (resp){
        let auth = resp.headers.get('Authorization');
        if (auth)
          await localStorage.setItem('Authorization', auth);
        if(resp.status == 200)
          await this.router.navigate(['/lista-de-compra']);
      }
    });
  }

}
