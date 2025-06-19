import { AuthService } from './../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Hen } from '../interfaces/Hen';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HenService {
  private henUrl = `${environment.ms_hen}/hen`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  /**
   * 🔐 Creates headers with authorization token
   */
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

  update(hen: Hen): Observable<Hen> {
    const url = `${this.henUrl}/update/${hen.id}`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put<Hen>(url, hen, { headers }).pipe(catchError(this.handleError))
      )
    );
  }

  getHenById(id: number): Observable<any> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<any>(`${this.henUrl}/${id}`, { headers })
      )
    );
  }

  getHens(): Observable<Hen[]> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<Hen[]>(this.henUrl, { headers }).pipe(catchError(this.handleError))
      )
    );
  }

  getInactiveHens(): Observable<Hen[]> {
    const url = `${this.henUrl}/inactivos`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<Hen[]>(url, { headers }).pipe(catchError(this.handleError))
      )
    );
  }

  create(hen: Hen): Observable<Hen> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.post<Hen>(`${this.henUrl}`, hen, { headers }).pipe(catchError(this.handleError))
      )
    );
  }

  // Método para buscar gallinas por fecha
  getHensByDate(arrivalDate: string): Observable<Hen[]> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<Hen[]>(`${this.henUrl}/buscar/${arrivalDate}`, { headers })
      )
    );
  }

  getHen(id: number): Observable<Hen> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<Hen>(`${this.henUrl}/${id}`, { headers }).pipe(catchError(this.handleError))
      )
    );
  }

  activate(id: number): Observable<Hen> {
    const url = `${this.henUrl}/activar/${id}`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put<Hen>(url, {}, { headers }).pipe(catchError(this.handleError))
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
        this.http.put<void>(`${this.henUrl}/inactivar/${id}`, data, { headers }).pipe(catchError(this.handleError))
      )
    );
  }

  deletePhysically(id: number | null): Observable<Hen> {
    if (id === null) {
      return throwError(() => 'El ID no puede ser null');
    }
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.delete<Hen>(`${this.henUrl}/${id}`, { headers }).pipe(catchError(this.handleError))
      )
    );
  }

  private handleError(error: any) {
    console.error('Error al hacer la solicitud', error);
    if (error.status === 0) {
      return throwError(() => 'No se puede conectar al servidor');
    } else {
      return throwError(() =>
        error.error?.message || 'Ocurrió un error, por favor intente de nuevo'
      );
    }
  }
}
