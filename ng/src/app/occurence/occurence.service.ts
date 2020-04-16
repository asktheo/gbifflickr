import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OccurenceResponse} from '../occurence/occurence-response';
import {Occurence} from './occurence';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OccurenceService {
  API_URL: string = environment.API_URL;
  DEFAULT_USER: string = '5e947e7e4938265112b0a6b6';
  lastUser: string;

  private occurences = new BehaviorSubject([]);
  currentOccurences = this.occurences.asObservable();

  private user = new BehaviorSubject(this.DEFAULT_USER);
  currentUser = this.user.asObservable();

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.API_URL + '/occurrences';
    this.currentUser.subscribe((userId) => {
      if(userId !== this.lastUser){
        this.lastUser = userId;
        this.getByUser(userId).subscribe(data =>{
          this.occurences.next(data);
        });
      }
    });
  }

  changeUser(userId: string){
    this.user.next(userId);
  }

  getByUser(userId: string): Observable<Occurence[]> {
      return this.http.get<Occurence[]>(`${this.baseUrl}/by/user/` + userId, {headers: httpOptions.headers});
  }

/*  isInitialized(): boolean {
    return this.userOccurences[this.activeUser] != undefined;
  }

  cache(occurrences: Occurence[]) {
    this.userOccurences[this.activeUser].occurences = occurrences;
  }

  fromCache(): Occurence[] {
    return this.userOccurences[this.activeUser].occurences;
  }*/

}
