import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { Consumption } from '../interfaces/consumption';
import { environment } from '../../environments/environments';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionService {
  private consumptionUrl = `${environment.ms_consumption}/consumption`;
  private homeUrl = `${environment.ms_home}/homes`;

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

  listActiveConsumptions(): Observable<Consumption[]> {
    const url = `${this.consumptionUrl}/lista-activos`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<Consumption[]>(url, { headers })
      )
    );
  }

  listInactiveConsumptions(): Observable<Consumption[]> {
    const url = `${this.consumptionUrl}/lista-inactivos`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<Consumption[]>(url, { headers })
      )
    );
  }

  registerConsumption(consumptionData: any): Observable<any> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.post(this.consumptionUrl, consumptionData, { headers })
      )
    );
  }

  inactivateConsumption(id: number): Observable<any> {
    const url = `${this.consumptionUrl}/${id}/inactivar`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put(url, {}, { headers })
      )
    );
  }

  restoreConsumption(id: number): Observable<any> {
    const url = `${this.consumptionUrl}/${id}/restore`;
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put(url, {}, { headers })
      )
    );
  }

  updateConsumption(id: number, consumption: any): Observable<any> {
    delete consumption.names; // Seguridad
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put(`${this.consumptionUrl}/${id}`, consumption, { headers })
      )
    );
  }

  getHomes(): Observable<any[]> {
    return this.withAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<any[]>(this.homeUrl, { headers })
      )
    );
  }
}
