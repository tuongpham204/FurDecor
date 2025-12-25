import { Component } from '@angular/core';
import { Header } from './shared/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { ScrollTop } from './shared/scroll-top/scroll-top';
import { ToastComponent } from './shared/toast.component/toast.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer, ScrollTop, ToastComponent ,BreadcrumbComponent],
  templateUrl: './app.html',
})
export class App {
  title = 'my-ecommerce';
}
