import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumption } from '../interfaces/consumption';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionService {
  private baseUrl = 'https://vg-internal-consumption-eggs.onrender.com/consumption';

  constructor(private http: HttpClient) {}

  listActiveConsumptions(): Observable<Consumption[]> {
    const url = `${this.baseUrl}/lista-activos`;
    return this.http.get<Consumption[]>(url, { headers: this.getHeaders() });
  }

  listInactiveConsumptions(): Observable<Consumption[]> {
    const url = `${this.baseUrl}/lista-inactivos`;
    return this.http.get<Consumption[]>(url, { headers: this.getHeaders() });
  }

  registerConsumption(consumptionData: any): Observable<any> {
    return this.http.post(this.baseUrl, consumptionData, { headers: this.getHeaders() });
  }

  inactivateConsumption(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}/inactivar`;
    return this.http.put(url, {}, { headers: this.getHeaders() });
  }

  restoreConsumption(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}/restore`;
    return this.http.put(url, {}, { headers: this.getHeaders() });
  }

  updateConsumption(id: number, consumption: any): Observable<any> {
    delete consumption.names; // Seguridad
    return this.http.put(`${this.baseUrl}/${id}`, consumption, { headers: this.getHeaders() });
  }

  getHomes(): Observable<any[]> {
    const url = 'https://vg-internal-consumption-eggs.onrender.com/homes';
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  private getHeaders(): { [header: string]: string } {
    return {
      'Content-Type': 'application/json',
    };
  }
}
