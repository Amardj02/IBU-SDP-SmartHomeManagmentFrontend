import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/accounts/';
  private roomUrl = 'http://localhost:8000/rooms/';
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$ = this.loggedIn.asObservable();


  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}login/`, { username, password }).pipe(
    map((response) => {
      if (response && response.access) {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.loggedIn.next(true);
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
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  return this.http.post<any>(
    `${this.apiUrl}register/`,
    {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
    },
    { headers }
  );
}
getUserInfo(): any {
  const token = localStorage.getItem('access_token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
}

isSuperUser(): boolean {
  const userInfo = this.getUserInfo();
  return userInfo?.is_superuser || false;
}
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.loggedIn.next(false); // Notify subscribers that user is logged out
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

updateProfile(data: any): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  return this.http.put('http://localhost:8000/api/accounts/me/', data, { headers });
}

changePassword(currentPassword: string, newPassword: string): Observable<any> {
  const body = { current_password: currentPassword, new_password: newPassword };
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  };
  return this.http.post(`${this.apiUrl}change-password/`, body, { headers });
}

getUser(): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.get('http://localhost:8000/api/accounts/me/', { headers });
}
}