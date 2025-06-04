import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/accounts/';
  private roomUrl = 'http://localhost:8000/rooms/';



  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}login/`, { username, password }).pipe(
    map((response) => {
      if (response && response.access) {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        console.log('Access Token Stored:', response.access);
        this.router.navigate(['/rooms']); 
      } else {
        console.error('Access Token not present in the response:', response);
      }
      return response;
    })
  );
}

register(
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}register/`, {
    username,
    password,
    first_name: firstName,
    last_name: lastName,
    email,
  });
}
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
  getRoom(roomId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get(`${this.roomUrl}${roomId}/`, { headers });
  }
  getRooms(): Observable<any[]> {
    const accessToken = localStorage.getItem('access_token');
    console.log('Access Token:', accessToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    console.log('Request Headers:', headers); 

    return this.http.get<any[]>(this.roomUrl, { headers });
  }
  createRoom(roomData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    });

    return this.http.post<any>(`${this.roomUrl}`, roomData, { headers });
  }

  updateRoom(roomId: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(`${this.roomUrl}${roomId}/`, data, { headers });
  }

   deleteRoom(roomId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.delete<any>(`${this.roomUrl}${roomId}/`, { headers });
  }
}
