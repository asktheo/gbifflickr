import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {PhotoOutPut} from "./species-media";
import {PHOTOS} from "./mock/mock-species-media";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class SpeciesMediaService {
  API_URL: string = environment.API_URL;
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.API_URL + '/media';
  }

  getByUser(userId: string, tags: string[]): Observable<PhotoOutPut[]> {
    const searchParams = new HttpParams().set("tags", tags.join(","));
    return this.http.get<PhotoOutPut[]>(`${this.baseUrl}/by/user/` + userId, {headers: httpOptions.headers, params: searchParams});
  }

  getMockContent() : Observable<PhotoOutPut[]>{
    return of(PHOTOS);
  }

}
