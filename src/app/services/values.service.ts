import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private analogvaluesUrl = 'http://localhost:8000/analog-values/';
  private digitalValuesUrl = 'http://localhost:8000/digital-values/';
  private smartValuesUrl = 'http://localhost:8000/smart-values/';

  constructor(private http: HttpClient, private router: Router) { }

  getAnalogValues(analogDeviceId: number): Observable<any[]> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.get<any[]>(`${this.analogvaluesUrl}?device=${analogDeviceId}`, { headers });
  }
  
  createAnalogValue(analogDeviceId: number, analogValueData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    });
  
    return this.http.post<any>(this.analogvaluesUrl, { ...analogValueData, device: analogDeviceId }, { headers });
  }
  
  updateAnalogValue(analogValueId: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.put<any>(`${this.analogvaluesUrl}${analogValueId}/`, data, { headers });
  }
  
  deleteAnalogValue(analogValueId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.delete<any>(`${this.analogvaluesUrl}${analogValueId}/`, { headers });
  }
  
  
  getSmartValues(smartDeviceId: number): Observable<any[]> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.get<any[]>(`${this.smartValuesUrl}?device=${smartDeviceId}`, { headers });
  }
  
  createSmartValue(smartDeviceId: number, smartValueData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.post<any>(this.smartValuesUrl, { ...smartValueData, device: smartDeviceId }, { headers });
  }
  
  updateSmartValue(smartValueId: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.put<any>(`${this.smartValuesUrl}${smartValueId}/`, data, { headers });
  }
  
  deleteSmartValue(smartValueId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.delete<any>(`${this.smartValuesUrl}${smartValueId}/`, { headers });
  }
getDigitalValues(digitalDeviceId: number): Observable<any[]> {
  const accessToken = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
  });

  return this.http.get<any[]>(`${this.digitalValuesUrl}?device=${digitalDeviceId}`, { headers });
}

createDigitalValue(digitalDeviceId: number, digitalValueData: any): Observable<any> {
  const accessToken = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  });

  return this.http.post<any>(this.digitalValuesUrl, { ...digitalValueData, device: digitalDeviceId }, { headers });
}

updateDigitalValue(digitalValueId: number, data: any): Observable<any> {
  const accessToken = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  });

  return this.http.put<any>(`${this.digitalValuesUrl}${digitalValueId}/`, data, { headers });
}

deleteDigitalValue(digitalValueId: number): Observable<any> {
  const accessToken = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
  });

  return this.http.delete<any>(`${this.digitalValuesUrl}${digitalValueId}/`, { headers });
}
}
