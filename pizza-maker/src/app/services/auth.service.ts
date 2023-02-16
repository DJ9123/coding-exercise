import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthResponse } from "src/app/interfaces/auth-response";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject: BehaviorSubject<AuthResponse | null>;
  public currentAuth: Observable<AuthResponse | null>;
  private navigateUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authSubject = new BehaviorSubject<any>(
        { access_token: token }
      );
    } else {
      this.authSubject = new BehaviorSubject<any>(null);
    }
    this.currentAuth = this.authSubject.asObservable();
    this.navigateUrl = this.route.snapshot.queryParams['prev'] || '/';
  }


  public get token(): any {
    return this.authSubject.value?.access_token;
  }


  login(username: string, password: string) {
    return this.http.post<any>(
      'https://pizza-api-app.herokuapp.com/api/auth',
      {
        username: username,
        password: password,
      })
      .pipe(
        map((data: AuthResponse) => {
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            this.authSubject.next({ access_token: data.access_token });
            this.router.navigate([this.navigateUrl]);
          }
          return data;
        }),
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.authSubject.next(null);
    this.router.navigate([this.navigateUrl]);
  }
}
