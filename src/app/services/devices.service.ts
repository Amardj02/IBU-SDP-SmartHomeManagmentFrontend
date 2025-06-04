import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private analogDevicesUrl = 'http://localhost:8000/analog-devices/';
  private digitalDevicesUrl = 'http://localhost:8000/digital-devices/';
  private smartDevicesUrl = 'http://localhost:8000/smart-devices/';
  constructor(private http: HttpClient, private router: Router) { }

  getAnalogDevice(analogDeviceId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get<any>(`${this.analogDevicesUrl}${analogDeviceId}/`, { headers });
  }
  getAnalogDevices(): Observable<any[]> {
    const accessToken = localStorage.getItem('access_token');
    console.log('Access Token:', accessToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    console.log('Request Headers:', headers); 

    return this.http.get<any[]>(this.analogDevicesUrl, { headers });
  }
  createAnalogDevice(analogDeviceData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    });

    return this.http.post<any>(`${this.analogDevicesUrl}`, analogDeviceData, { headers });
  }

  updateAnalogDevice(analogDeviceId: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(`${this.analogDevicesUrl}${analogDeviceId}/`, data, { headers });
  }

   deleteAnalogDevice(analogDeviceId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.delete<any>(`${this.analogDevicesUrl}${analogDeviceId}/`, { headers });
  }
  getSmartDevices(): Observable<any[]> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.get<any[]>(this.smartDevicesUrl, { headers });
  }
  
  getSmartDevice(smartDeviceId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.get<any>(`${this.smartDevicesUrl}${smartDeviceId}/`, { headers });
  }
  
  createSmartDevice(smartDeviceData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.post<any>(this.smartDevicesUrl, smartDeviceData, { headers });
  }
  
  updateSmartDevice(smartDeviceId: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.put<any>(`${this.smartDevicesUrl}${smartDeviceId}/`, data, { headers });
  }
  
  deleteSmartDevice(smartDeviceId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.delete<any>(`${this.smartDevicesUrl}${smartDeviceId}/`, { headers });
  }

  getDigitalDevices(): Observable<any[]> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.get<any[]>(this.digitalDevicesUrl, { headers });
  }
  
  getDigitalDevice(digitalDeviceId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.get<any>(`${this.digitalDevicesUrl}${digitalDeviceId}/`, { headers });
  }
  
  createDigitalDevice(digitalDeviceData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.post<any>(this.digitalDevicesUrl, digitalDeviceData, { headers });
  }
  
  updateDigitalDevice(digitalDeviceId: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.put<any>(`${this.digitalDevicesUrl}${digitalDeviceId}/`, data, { headers });
  }
  
  deleteDigitalDevice(digitalDeviceId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.delete<any>(`${this.digitalDevicesUrl}${digitalDeviceId}/`, { headers });
  }

  toggleActive(deviceId: number, type: string): Observable<any> {
    const url = `http://localhost:8000/${type}-devices/${deviceId}/activate/`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.patch<any>(url, {}, { headers });
  }
  
}
