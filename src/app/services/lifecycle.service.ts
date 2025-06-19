import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CicloVida } from '../interfaces/Lifecycle';

@Injectable({
  providedIn: 'root',
})
export class CicloVidaService {
  private urlEndPoint: string = 'https://vg-ms-lifecycle.onrender.com/cicloVida';

  constructor(private http: HttpClient) {}

  getCiclosByTypeIto(typeIto: string): Observable<CicloVida[]> {
    const url = `${this.urlEndPoint}/type/${typeIto}`;
    return this.http.get<CicloVida[]>(url, { headers: this.getHeaders() });
  }

  update(cicloVida: CicloVida): Observable<CicloVida> {
    const url = `${this.urlEndPoint}/update/${cicloVida.id}`;
    return this.http.put<CicloVida>(url, cicloVida, { headers: this.getHeaders() });
  }

  getCycles(): Observable<CicloVida[]> {
    return this.http.get<CicloVida[]>(this.urlEndPoint, { headers: this.getHeaders() });
  }

  getInactiveCycles(): Observable<CicloVida[]> {
    const url = `${this.urlEndPoint}/inactivos`;
    return this.http.get<CicloVida[]>(url, { headers: this.getHeaders() });
  }

  create(cicloVida: CicloVida): Observable<CicloVida> {
    return this.http.post<CicloVida>(`${this.urlEndPoint}`, cicloVida, { headers: this.getHeaders() });
  }

  getCycle(id: number): Observable<CicloVida> {
    return this.http.get<CicloVida>(`${this.urlEndPoint}/${id}`, { headers: this.getHeaders() });
  }

  activate(id: number): Observable<CicloVida> {
    const url = `${this.urlEndPoint}/activar/${id}`;
    return this.http.put<CicloVida>(url, {}, { headers: this.getHeaders() });
  }

  delete(id: number | null): Observable<void> {
    if (id === null) {
      return throwError(() => new Error('El ID no puede ser null'));
    }
    const data = { status: 'I' };
    return this.http.put<void>(`${this.urlEndPoint}/inactivar/${id}`, data, { headers: this.getHeaders() });
  }

  deletePhysically(id: number | null): Observable<CicloVida> {
    if (id === null) {
      return throwError(() => new Error('El ID no puede ser null'));
    }
    return this.http.delete<CicloVida>(`${this.urlEndPoint}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): { [header: string]: string } {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }
}
