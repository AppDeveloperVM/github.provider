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

  getMostStargazedRepos() : Observable<any>{
    const url = `https://api.github.com/search/repositories?q=stars:%3E1&sort=stars`;
    return this.http.get<any>(url);
  }

  getMostFollowedUsers() : Observable<any>{
    const url = `https://api.github.com/search/users?q=followers:%3E1&sort=followers`;
    return this.http.get<any>(url);
  }

  getUsersWithGreatestRepoCount() : Observable<any>{
    const url = `https://api.github.com/search/users?q=repos:%3E1&sort=repos`;
    return this.http.get<any>(url);
  }

  getRepos(username : string){
    const url = `https://api.github.com/users/${username}/repos`;
    return this.http.get<any>(url);
  }

  getFollowers(username : string){
    const url = `https://api.github.com/users/${username}/followers`;
    return this.http.get<any>(url);
  }

}
