import { Component } from '@angular/core';
import { Header } from './shared/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
})
export class App {
  title = 'my-ecommerce';
}
