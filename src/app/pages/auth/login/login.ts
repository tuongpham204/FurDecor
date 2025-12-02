import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './login.html',
})
export class Login {
  title = 'FurDecor';
}
