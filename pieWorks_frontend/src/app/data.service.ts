import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://glorious-sheath-dress-fawn.cyclic.cloud/data';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCityNames(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: any[]) => {
        return Array.from(new Set(data.map((item: any) => item.name)));
      })
    );
  }
}
