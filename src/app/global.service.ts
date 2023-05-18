import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  basepath: any = "http://localhost:4000"

  post(url: any, req: any) {
    return this.http.post(url, req)
  }

  get(url:any){
    return this.http.get(url)
  }

}
