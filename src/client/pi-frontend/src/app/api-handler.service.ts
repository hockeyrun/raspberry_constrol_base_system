import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
// import { catchError, retry } from "rxjs/operator";
import { Account } from "./account";

@Injectable({
  providedIn: 'root'
})

export class ApiHandlerService {
  signinURL = 'http://192.168.0.101:8000/api/signin'

  constructor(private http: HttpClient) {

  }

  signin(user_name: string, password: string): Observable<Account> {
    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('password', password);

    return this.http.post<Account>(this.signinURL, formData).pipe(map(obj => {
      console.log('New Obj: ', obj)
      if (obj) {
        if (obj.result == "true") {
          var acc = new Account()
          acc.account_id = obj.data.account_id
          acc.first_name = obj.data.first_name
          acc.last_name = obj.data.last_name
          acc.user_name = obj.data.user_name
          return acc
        }
        return new Account();
      }

      return new Account();
    }))
  }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('user_name', username);
    formData.append('password', password);

    return this.http.post<any>(this.signinURL, formData)
      .pipe(map(obj => {
        // login successful if there's a jwt token in the response
        console.log('New Obj: ', obj)
        if (obj) {
          if (obj.result == "true") {
            var acc = new Account()
            acc.account_id = obj.data.account_id
            acc.first_name = obj.data.first_name
            acc.last_name = obj.data.last_name
            acc.user_name = obj.data.user_name
            return acc
          }
          return new Account();
        }

        return new Account();
      }));
  }

}