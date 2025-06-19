import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { CicloVida } from '../interfaces/Lifecycle';
import { environment } from '../../environments/environments';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CicloVidaService {
  private lifecycleUrl = `${environment.ms_lifecycle}/cicloVida`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private withAuthHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        return from([new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })]);
      })
    );
  }

  getCiclosByTypeIto(typeIto: string): Observable<CicloVida[]> {
    const url = `${this.lifecycleUrl}/type/${typeIto}`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<CicloVida[]>(url, { headers })
      )
    );
  }

  update(cicloVida: CicloVida): Observable<CicloVida> {
    const url = `${this.lifecycleUrl}/update/${cicloVida.id}`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put<CicloVida>(url, cicloVida, { headers })
      )
    );
  }

  getCycles(): Observable<CicloVida[]> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<CicloVida[]>(this.lifecycleUrl, { headers })
      )
    );
  }

  getInactiveCycles(): Observable<CicloVida[]> {
    const url = `${this.lifecycleUrl}/inactivos`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<CicloVida[]>(url, { headers })
      )
    );
  }

  create(cicloVida: CicloVida): Observable<CicloVida> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.post<CicloVida>(`${this.lifecycleUrl}`, cicloVida, { headers })
      )
    );
  }

  getCycle(id: number): Observable<CicloVida> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<CicloVida>(`${this.lifecycleUrl}/${id}`, { headers })
      )
    );
  }

  activate(id: number): Observable<CicloVida> {
    const url = `${this.lifecycleUrl}/activar/${id}`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put<CicloVida>(url, {}, { headers })
      )
    );
  }

  delete(id: number | null): Observable<void> {
    if (id === null) {
      return throwError(() => 'El ID no puede ser null');
    }
    const data = { status: 'I' };
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put<void>(`${this.lifecycleUrl}/inactivar/${id}`, data, { headers })
      )
    );
  }

  deletePhysically(id: number | null): Observable<CicloVida> {
    if (id === null) {
      return throwError(() => 'El ID no puede ser null');
    }
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.delete<CicloVida>(`${this.lifecycleUrl}/${id}`, { headers })
      )
    );
  }
}
