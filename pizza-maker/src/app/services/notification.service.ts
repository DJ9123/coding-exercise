import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  duration = 3500;

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  open(message: string) {
    this.snackbar.open(message, 'dismiss', {duration: this.duration});
  }

}
