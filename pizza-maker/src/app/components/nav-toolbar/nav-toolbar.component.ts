import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent {
  private login$ = new Subject();
  public isLoggedIn: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentAuth
      .pipe(takeUntil(this.login$))
      .subscribe(token => {
        this.isLoggedIn = !!token;
      });
  }

  ngOnDestroy(): void {
    this.login$.next(true);
    this.login$.complete();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
