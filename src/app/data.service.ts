import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  HTTP_OPTIONS = new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  });

  passwordEntered: boolean;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


//   Get SAS for read access to storage
  public getURL(): Promise<any> {
    return this.http.get('https://access-storage.rabt.ncldata.dev/access-storage', {headers: this.HTTP_OPTIONS})
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);

  }

  // check password
  public checkPassword(pass): Promise<any> {
    return this.http.get('https://access-storage.rabt.ncldata.dev/access-storage?p=' + pass, {headers: this.HTTP_OPTIONS})
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);

  }

  setPasswordEntered(entered: boolean) {
    this.passwordEntered = entered;
  }

}
