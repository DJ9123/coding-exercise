import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  
  constructor (
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'Password cannot be empty';
    }
    if (this.loginForm.controls.password.hasError('minlength')) {
      return 'Password must be longer than 3 characters';
    }
    return '';
  }

  login(event: any) {
    const params = this.loginForm.value;
    if (params.username && params.password) {
      this.authService.login(params.username, params.password)
        .pipe(first())
        .subscribe(
         {
          error: (e) => {
            console.error(e);
            this.notificationService.open(e.error.msg);
          }
         }
        );
    }
  }
}
