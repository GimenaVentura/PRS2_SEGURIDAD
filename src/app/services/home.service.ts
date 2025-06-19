import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { Home } from '../interfaces/home';
import { environment } from '../../environments/environments';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private homeUrl = `${environment.ms_home}/homes`;

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

  getActiveHomes(): Observable<Home[]> {
    return this.withAuthHeaders().pipe(
      switchMap(headers => this.http.get<Home[]>(`${this.homeUrl}/active`, { headers }))
    );
  }

  getInactiveHomes(): Observable<Home[]> {
    return this.withAuthHeaders().pipe(
      switchMap(headers => this.http.get<Home[]>(`${this.homeUrl}/inactive`, { headers }))
    );
  }

  createHome(homeData: Home): Observable<Home> {
    return this.withAuthHeaders().pipe(
      switchMap(headers => this.http.post<Home>(this.homeUrl, homeData, { headers }))
    );
  }

  deactivateHome(id: number): Observable<void> {
  return this.withAuthHeaders().pipe(
    switchMap(headers => this.http.put<void>(`${this.homeUrl}/deactivate/${id}`, {}, { headers }))
  );
}

  reactivateHome(id: number): Observable<Home> {
  return this.withAuthHeaders().pipe(
    switchMap(headers => this.http.put<Home>(`${this.homeUrl}/restore/${id}`, {}, { headers }))
  );
}

  updateHome(id: number, homeData: Home): Observable<Home> {
  return this.withAuthHeaders().pipe(
    switchMap(headers => this.http.put<Home>(`${this.homeUrl}/${id}`, homeData, { headers }))
  );
}

}