import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'signup-page',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './signup.html',
})
export class Signup {
  title = '';
}
