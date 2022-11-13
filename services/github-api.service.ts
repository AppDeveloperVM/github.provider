import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Repo } from '../models/repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubAPIService {

  constructor(private http: HttpClient) { }

  getUser(name: string, gitAuthToken : string) : Observable<User>{
    const url = `https://api.github.com/users/${name}`;
    return this.http.get<User>(url);
  }

  getUserRepos(name: string, gitAuthToken : string) : Observable<Repo[]>{ 
    const url = `https://api.github.com/users/${name}/repos`;
    const headerDict = {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `token ${gitAuthToken}`
      }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    //Intentando pasar del límite de peticiones con una llamada autorizada
    return this.http.get<Repo[]>(url);
  }

}
