import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = enviroment.api
  constructor(private http:HttpClient) { }


  searchTrakcs$(term: string): Observable<any>{
    return this.http.get(`${this.URL}/tracks?src=${term}`)
    .pipe(
      map((dataRaw: any) => dataRaw.data)
    )
  }
}
