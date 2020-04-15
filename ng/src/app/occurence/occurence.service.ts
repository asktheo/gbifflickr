import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OccurenceResponse} from '../occurence/occurence-response';
import {Occurence} from './occurence';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class OccurenceService {
  API_URL: string = environment.API_URL;

  private occurences: Occurence[] = [];
  private limit = 300;
  private baseUrl: string;
  private searchParams: HttpParams;
  public initialized = false;

  constructor(private http: HttpClient) {
    this.baseUrl = this.API_URL + '/occurrences';
    this.searchParams = new HttpParams().set('limit', this.limit.toString());
  }

  getByUser(userId: string): Observable<Occurence[]> {
    return this.http.get<Occurence[]>(`${this.baseUrl}/by/user/` + userId, {headers: httpOptions.headers, params: this.searchParams});
  }

  setParam(key: string, value: string) {
    this.searchParams = this.searchParams.set(key, value);
  }

  cache(occurrences: Occurence[]) {
    this.occurences = occurrences;
    this.initialized = true;
  }

  fromCache(): Occurence[] {
    return this.occurences;
  }

}
