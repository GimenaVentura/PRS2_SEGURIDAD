import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hen } from '../interfaces/Hen';

@Injectable({
  providedIn: 'root',
})
export class HenService {
  private urlEndPoint = 'https://vg-ms-hen.onrender.com/hen';

  constructor(private http: HttpClient) {}

  update(hen: Hen): Observable<Hen> {
    const url = `${this.urlEndPoint}/update/${hen.id}`;
    return this.http.put<Hen>(url, hen, { headers: this.getHeaders() });
  }

  getHenById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getHens(): Observable<Hen[]> {
    return this.http.get<Hen[]>(this.urlEndPoint, { headers: this.getHeaders() });
  }

  getInactiveHens(): Observable<Hen[]> {
    const url = `${this.urlEndPoint}/inactivos`;
    return this.http.get<Hen[]>(url, { headers: this.getHeaders() });
  }

  create(hen: Hen): Observable<Hen> {
    return this.http.post<Hen>(`${this.urlEndPoint}`, hen, { headers: this.getHeaders() });
  }

  getHensByDate(arrivalDate: string): Observable<Hen[]> {
    return this.http.get<Hen[]>(`${this.urlEndPoint}/buscar/${arrivalDate}`, {
      headers: this.getHeaders(),
    });
  }

  getHen(id: number): Observable<Hen> {
    return this.http.get<Hen>(`${this.urlEndPoint}/${id}`, { headers: this.getHeaders() });
  }

  activate(id: number): Observable<Hen> {
    const url = `${this.urlEndPoint}/activar/${id}`;
    return this.http.put<Hen>(url, {}, { headers: this.getHeaders() });
  }

  delete(id: number | null): Observable<void> {
    if (id === null) {
      return throwError(() => new Error('El ID no puede ser null'));
    }
    const data = { status: 'I' };
    return this.http.put<void>(`${this.urlEndPoint}/inactivar/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  deletePhysically(id: number | null): Observable<Hen> {
    if (id === null) {
      return throwError(() => new Error('El ID no puede ser null'));
    }
    return this.http.delete<Hen>(`${this.urlEndPoint}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): { [header: string]: string } {
    return {
      'Content-Type': 'application/json',
    };
  }
}
