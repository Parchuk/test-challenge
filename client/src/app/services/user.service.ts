import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AddUser, UpdatedUser, UsersListData } from '../models/FetchData';
import { UrlParams } from '../models/UrlParams';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl: string = 'http://localhost:5000/api/users';
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  getUsers(urlParams: UrlParams): Observable<UsersListData> {
    const { page, limit, filterName, filterType } = urlParams;

    return this.http.get<UsersListData>(
      `${this.usersUrl}/?page=${page}&limit=${limit}&filterName=${filterName}&filterType=${filterType}`
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${userId}`);
  }

  addUser(body: User): Observable<AddUser> {
    return this.http.post<AddUser>(`${this.usersUrl}`, body);
  }

  deleteUser(id: string): Observable<UsersListData> {
    return this.http.delete<UsersListData>(`${this.usersUrl}/${id}`);
  }

  updateUser(body: User): Observable<UpdatedUser> {
    return this.http.put<UpdatedUser>(`${this.usersUrl}/${body._id}`, body);
  }

  setParamsToUrl(urlParams: UrlParams): void {
    const { page, limit, filterName, filterType } = urlParams;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page,
        limit,
        filterName,
        filterType,
      },
    });
  }
  getParamsFromUrl(): UrlParams {
    let urlParams;
    this.activatedRoute.queryParams.subscribe((params) => {
      urlParams = {
        page: +params['page'],
        limit: +params['limit'],
        filterName: params['filterName'],
        filterType: +params['filterType'],
      };
    });
    return urlParams;
  }

  redirect(path: string): void {
    this.router.navigate([`${path}`]);
  }

  handlerError() {}
}
